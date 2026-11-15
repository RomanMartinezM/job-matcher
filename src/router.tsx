import { createBrowserRouter } from "react-router-dom"
import { AppShell } from "@/components/AppShell"
import { DashboardPage } from "@/pages/DashboardPage"
import { NotMigratedPage } from "@/pages/NotMigratedPage"
import { ResumesPage } from "@/pages/ResumesPage"
import { ExploreJobsPage } from "@/pages/ExploreJobsPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "jobs", element: <ExploreJobsPage /> },
      { path: "matches", element: <NotMigratedPage title="AI matches" /> },
      { path: "optimizer", element: <NotMigratedPage title="Resume optimizer" /> },
      { path: "resumes", element: <ResumesPage /> },
      { path: "saved", element: <NotMigratedPage title="Saved jobs" /> },
      { path: "settings", element: <NotMigratedPage title="Settings" /> },
      { path: "*", element: <NotMigratedPage title="Page not found" /> },
    ],
  },
])
