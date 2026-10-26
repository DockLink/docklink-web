'use client'

import { Component, useRef, useMemo, useEffect, useState, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const BRAND = '#1D4ED8'
const BRAND_SKY = '#38bdf8'
const SLATE = '#64748B'

/** Deterministic pseudo-random in [0, 1) */
function hash(n: number) {
  const x = Math.sin(n * 127.1) * 43758.5453
  return x - Math.floor(x)
}

function NetworkNodes({ count = 42 }: { count?: number }) {
  const group = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  const { positions, connections } = useMemo(() => {
    const positions: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      const t = i / count
      // Keep nodes inside a tighter sphere so edges never hit the canvas
      const radius = 0.75 + hash(i * 3.1) * 1.05
      const theta = hash(i * 7.7) * Math.PI * 2
      const y = (hash(i * 11.3) - 0.5) * 2.1
      positions.push(
        new THREE.Vector3(
          Math.cos(theta) * radius * (0.75 + t * 0.25),
          y,
          Math.sin(theta) * radius * (0.75 + t * 0.25),
        ),
      )
    }

    const connections: [number, number][] = []
    const maxDist = 1.25
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (positions[i].distanceTo(positions[j]) < maxDist) {
          connections.push([i, j])
        }
      }
    }
    return { positions, connections }
  }, [count])

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const verts = new Float32Array(connections.length * 6)
    connections.forEach(([a, b], i) => {
      const i6 = i * 6
      verts[i6] = positions[a].x
      verts[i6 + 1] = positions[a].y
      verts[i6 + 2] = positions[a].z
      verts[i6 + 3] = positions[b].x
      verts[i6 + 4] = positions[b].y
      verts[i6 + 5] = positions[b].z
    })
    geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
    return geo
  }, [positions, connections])

  const nodeGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const verts = new Float32Array(count * 3)
    positions.forEach((p, i) => {
      verts[i * 3] = p.x
      verts[i * 3 + 1] = p.y
      verts[i * 3 + 2] = p.z
    })
    geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
    return geo
  }, [positions, count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      group.current.rotation.y = t * 0.12
      group.current.rotation.x = Math.sin(t * 0.18) * 0.08
    }
    const mat = linesRef.current?.material
    if (mat && !Array.isArray(mat) && 'opacity' in mat) {
      mat.opacity = 0.22 + Math.sin(t * 1.4) * 0.06
    }
  })

  return (
    <group ref={group}>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color={BRAND} transparent opacity={0.28} />
      </lineSegments>
      <points geometry={nodeGeo}>
        <pointsMaterial
          color={BRAND}
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.85}
        />
      </points>
      {positions
        .filter((_, i) => i % 7 === 0)
        .map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshBasicMaterial color={i % 2 === 0 ? BRAND : BRAND_SKY} />
          </mesh>
        ))}
    </group>
  )
}

function CoreWireframe() {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    mesh.current.rotation.x = t * 0.25
    mesh.current.rotation.y = t * 0.35
  })

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.58, 1]} />
        <meshBasicMaterial color={BRAND} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.34, 0]} />
        <meshBasicMaterial color={BRAND_SKY} wireframe transparent opacity={0.4} />
      </mesh>
    </Float>
  )
}

function OrbitRing({
  radius,
  speed,
  tilt,
  color,
}: {
  radius: number
  speed: number
  tilt: number
  color: string
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * speed
  })

  return (
    <group ref={ref} rotation={[tilt, 0.4, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.007, 8, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

function Scene() {
  const root = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!root.current) return
    const { x, y } = state.pointer
    // Light parallax — strong tilt was pushing rings past the canvas edge
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, x * 0.18, 0.04)
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -y * 0.1, 0.04)
  })

  return (
    <group ref={root} scale={1.05}>
      <ambientLight intensity={0.6} />
      <NetworkNodes />
      <CoreWireframe />
      <OrbitRing radius={1.05} speed={0.35} tilt={0.55} color={BRAND} />
      <OrbitRing radius={1.35} speed={-0.22} tilt={-0.35} color={BRAND_SKY} />
      <OrbitRing radius={1.62} speed={0.15} tilt={0.9} color={SLATE} />
    </group>
  )
}

/** Catches WebGL/three.js runtime errors so the rest of the page keeps working. */
class SceneErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/** Static stand-in used when WebGL is unavailable. */
function StaticFallback() {
  const nodes = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2
    const r = 120 + hash(i * 3.1) * 90
    return { x: 260 + Math.cos(a) * r, y: 260 + Math.sin(a) * r * 0.8 }
  })
  return (
    <svg viewBox="0 0 520 520" className="w-full h-full" aria-hidden>
      <ellipse cx="260" cy="260" rx="210" ry="80" fill="none" stroke={BRAND} strokeOpacity="0.25" transform="rotate(-20 260 260)" />
      <ellipse cx="260" cy="260" rx="170" ry="60" fill="none" stroke={BRAND_SKY} strokeOpacity="0.35" transform="rotate(25 260 260)" />
      {nodes.map((n, i) => (
        <line key={`l${i}`} x1={n.x} y1={n.y} x2={nodes[(i + 3) % 18].x} y2={nodes[(i + 3) % 18].y} stroke={BRAND} strokeOpacity="0.15" />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i % 4 === 0 ? 5 : 3} fill={i % 2 ? BRAND_SKY : BRAND} />
      ))}
      <polygon points="260,190 320,225 320,295 260,330 200,295 200,225" fill="none" stroke={BRAND} strokeOpacity="0.6" strokeWidth="1.5" />
      <polygon points="260,225 290,242 290,278 260,295 230,278 230,242" fill="none" stroke={BRAND_SKY} strokeOpacity="0.6" strokeWidth="1.5" />
    </svg>
  )
}

export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null)
  // This component is client-only (loaded with ssr: false), so browser checks are safe here
  const [mode] = useState<'webgl' | 'static'>(() => (supportsWebGL() ? 'webgl' : 'static'))
  const [visible, setVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Stop rendering frames while the hero is scrolled out of view
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const fallback = <StaticFallback />

  return (
    <div ref={wrapRef} className="relative w-full h-[520px] xl:h-[600px] overflow-visible">
      {mode === 'static' && fallback}
      {mode === 'webgl' && (
        <SceneErrorBoundary fallback={fallback}>
          <Canvas
            camera={{ position: [0, 0.15, 5.6], fov: 40, near: 0.1, far: 50 }}
            dpr={[1, 1.75]}
            frameloop={!visible ? 'never' : reducedMotion ? 'demand' : 'always'}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            style={{ background: 'transparent', overflow: 'visible' }}
            aria-hidden
          >
            <Scene />
          </Canvas>
        </SceneErrorBoundary>
      )}
    </div>
  )
}
