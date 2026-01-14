// app/dashboard/page.tsx
import { DashboardScreen } from "../../features/dashboard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-zinc-900 dark:to-zinc-950 p-4 rounded-lg">
      <DashboardScreen />
    </div>
  );
}
