// app/dashboard/layout.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";
import "@/app/globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-zinc-100 dark:bg-zinc-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col py-6 px-4">
        {/* LOGO */}
        <div className="text-2xl font-bold text-green-600 mb-8">Dividy</div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2 text-sm">
          <SidebarLink href="/dashboard" label="Tableau de bord" />
          <SidebarLink href="/dashboard/groups" label="Mes groupes" />
          <SidebarLink href="/dashboard/subscriptions" label="Abonnements" />
          <SidebarLink href="/dashboard/settings" label="Paramètres" />
        </nav>

        <div className="mt-auto pt-6">
          <p className="text-xs text-zinc-400">© 2024 Dividy</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md font-medium transition-all",
        "text-zinc-700 dark:text-zinc-300 hover:bg-green-100 hover:text-green-700",
        "dark:hover:bg-green-900/30 dark:hover:text-green-300"
      )}
    >
      {label}
    </Link>
  );
}
