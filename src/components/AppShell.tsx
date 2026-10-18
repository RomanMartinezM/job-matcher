import {
  Bookmark,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  Network,
  Settings2,
  Sparkles,
} from "lucide-react"
import { NavLink, Outlet } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/store/useAppStore"

const navigation = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Explore Jobs", path: "/jobs", icon: BriefcaseBusiness },
  { label: "AI Matches", path: "/matches", icon: Sparkles, badge: "27" },
  { label: "Resume Optimizer", path: "/optimizer", icon: Network },
  { label: "My Resumes", path: "/resumes", icon: FileText },
  { label: "Saved Jobs", path: "/saved", icon: Bookmark, savedCount: true },
  { label: "Settings", path: "/settings", icon: Settings2 },
]

function Brand() {
  return (
    <NavLink aria-label="Jobmatcher dashboard" className="flex items-center gap-3" to="/">
      <span aria-hidden="true" className="relative size-[22px]">
        <span className="absolute inset-0 rounded-full border-2 border-lime-300" />
        <span className="absolute left-[10px] top-0 size-[22px] rounded-full border-2 border-teal-300" />
      </span>
      <span className="text-[17px] font-semibold tracking-[-0.03em]">Jobmatcher</span>
    </NavLink>
  )
}

function NavigationList({ compact = false }: { compact?: boolean }) {
  const savedJobIds = useAppStore((state) => state.savedJobIds)

  return (
    <nav aria-label="Main navigation" className={cn(compact ? "flex min-w-max gap-1" : "grid gap-1")}>
      {navigation.map(({ label, path, icon: Icon, badge, savedCount }) => (
        <NavLink
          aria-label={savedCount ? `${label}, ${savedJobIds.length} saved` : label}
          className={({ isActive }) =>
            cn(
              "group relative flex min-h-[42px] items-center gap-2.5 rounded-[10px] border px-3 text-sm font-medium transition-[background-color,color,border-color] duration-150",
              compact ? "border-transparent px-3" : "w-full",
              isActive
                ? "border-[#292F3A] bg-[#1C222D] text-[#F5F7FA]"
                : "border-transparent text-[#A1A9B8] hover:bg-[#1C222D] hover:text-[#F5F7FA]",
            )
          }
          end={path === "/"}
          key={path}
          to={path}
        >
          {({ isActive }) => (
            <>
              {isActive && !compact && (
                <span aria-hidden="true" className="absolute left-[-1px] size-1.5 rounded-full bg-lime-300 shadow-[0_0_8px_#A3E635]" />
              )}
              <Icon aria-hidden="true" className="size-[17px] shrink-0" strokeWidth={1.8} />
              <span className="whitespace-nowrap">{label}</span>
              {(badge || savedCount) && (
                <span className="ml-auto min-w-5 rounded-md bg-[#232936] px-1.5 py-0.5 text-center text-[11px] tabular-nums text-[#A1A9B8]">
                  {savedCount ? savedJobIds.length : badge}
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

export function AppShell() {
  return (
    <div className="min-h-screen text-[#F5F7FA] md:flex">
      <aside className="hidden w-[232px] shrink-0 flex-col border-r border-[#292F3A] bg-[#151922] px-3.5 py-5 md:flex">
        <div className="mb-8 px-2">
          <Brand />
          <p className="mt-4 text-xs leading-relaxed text-[#707989]">
            Prototype · mock data · no accounts needed
          </p>
        </div>
        <p className="mb-2 px-3 text-xs font-medium text-[#707989]">Workspace</p>
        <NavigationList />
        <div className="mt-auto border-t border-[#292F3A] pt-4">
          <div className="flex items-center gap-3 px-2">
            <span className="grid size-9 place-items-center rounded-[10px] bg-[#0F5F52] text-sm font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.15)]">
              M
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Maya</p>
              <p className="text-xs text-[#707989]">Your workspace</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex min-h-[60px] items-center justify-between border-b border-[#292F3A] bg-[#090B0F]/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="md:hidden">
            <Brand />
          </div>
          <p className="hidden text-sm text-[#A1A9B8] md:block">Your career workspace</p>
          <div className="flex items-center gap-2 text-sm text-[#A1A9B8]">
            <span className="size-2 rounded-full bg-lime-300" />
            <span>Mock data</span>
          </div>
        </header>

        <div className="overflow-x-auto border-b border-[#292F3A] bg-[#101319] px-3 py-2 md:hidden">
          <NavigationList compact />
        </div>

        <main className="mx-auto w-full max-w-[1236px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
