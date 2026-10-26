export default function MiniScreen({ children, url }: { children: React.ReactNode; url?: string }) {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#FAFBFC] border-b border-slate-100">
        <span className="w-2 h-2 rounded-full bg-slate-200"/>
        <span className="w-2 h-2 rounded-full bg-slate-200"/>
        <span className="w-2 h-2 rounded-full bg-slate-200"/>
        {url && (
          <div className="ml-2 flex-1 bg-slate-100 rounded-full h-4 flex items-center px-2.5 max-w-[200px]">
            <span className="text-[9px] text-slate-400 truncate">{url}</span>
          </div>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
