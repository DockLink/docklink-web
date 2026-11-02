-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey (Auth schema is not modeled in Prisma)
ALTER TABLE "users" ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES auth.users("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Ensure admin helper exists (also defined in supabase/admin-rls.sql)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = ''
AS $$
  SELECT coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM public;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "users" TO authenticated;
GRANT ALL ON TABLE "users" TO service_role;

ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS users_self_select ON "users";
CREATE POLICY users_self_select
  ON "users" FOR SELECT TO authenticated
  USING (id = auth.uid());

DROP POLICY IF EXISTS users_admin_all ON "users";
CREATE POLICY users_admin_all
  ON "users" FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
