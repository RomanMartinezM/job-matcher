import { Bookmark, Check, ChevronRight, FileText, Search, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { strongestMatches } from "@/data/jobs"
import { useAppStore } from "@/store/useAppStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

function MatchScore({ score }: { score: number }) {
  return (
    <div
      aria-label={`${score}% match`}
      className="grid size-[58px] shrink-0 place-items-center rounded-full"
      role="img"
      style={{ background: `conic-gradient(#2DD4BF ${score * 3.6}deg, #232936 0)` }}
    >
      <div className="grid size-[46px] place-items-center rounded-full bg-[#151922] font-mono text-[17px] font-semibold text-teal-300">
        {score}
      </div>
    </div>
  )
}

function MatchRow({
  job,
  isSaved,
  onToggleSave,
}: {
  job: (typeof strongestMatches)[number]
  isSaved: boolean
  onToggleSave: () => void
}) {
  return (
    <article className="group flex items-center gap-3 rounded-[14px] border border-[#292F3A] bg-[#151922] p-3.5 transition-[background-color,border-color] duration-150 hover:border-[#3A4252] hover:bg-[#1C222D] sm:gap-4 sm:p-[18px]">
      <div
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-[10px] text-sm font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.15)]"
        style={{ backgroundColor: job.color }}
      >
        {job.company
          .split(/\s+/)
          .map((word) => word[0])
          .join("")
          .slice(0, 2)}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] font-semibold tracking-[-0.015em]">{job.title}</h3>
        <p className="mt-1 truncate text-[13px] text-[#A1A9B8]">
          {job.company} <span aria-hidden="true">·</span> {job.location} <span aria-hidden="true">·</span> {job.salary}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span aria-label={`${job.matchPercent}% match`} className="font-mono text-[17px] text-teal-300 sm:hidden">
          {job.matchPercent}%
        </span>
        <span className="hidden sm:block">
          <MatchScore score={job.matchPercent} />
        </span>
      </div>

      <Button
        aria-label={isSaved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
        aria-pressed={isSaved}
        className="size-9 shrink-0 rounded-lg sm:ml-1"
        onClick={onToggleSave}
        size="icon"
        variant="ghost"
      >
        {isSaved ? (
          <Bookmark aria-hidden="true" className="size-[17px] fill-lime-300 text-lime-300" />
        ) : (
          <Bookmark aria-hidden="true" className="size-[17px]" />
        )}
      </Button>
    </article>
  )
}

export function DashboardPage() {
  const navigate = useNavigate()
  const savedJobIds = useAppStore((state) => state.savedJobIds)
  const toggleSavedJob = useAppStore((state) => state.toggleSavedJob)

  function handleSave(jobId: number, title: string) {
    const wasSaved = savedJobIds.includes(jobId)
    toggleSavedJob(jobId)
    toast.success(wasSaved ? "Job removed from saved jobs" : "Job saved", {
      description: title,
    })
  }

  return (
    <div className="mx-auto w-full max-w-[1180px]">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.04em] sm:text-[36px]">
            Good morning, Maya.
          </h1>
          <p className="mt-2 max-w-[650px] text-sm leading-relaxed text-[#A1A9B8]">
            Your resume is ranked against 27 open roles. Three are worth acting on today.
          </p>
        </div>
      </div>

      <section aria-label="Job search overview" className="grid gap-3 sm:grid-cols-[minmax(220px,0.8fr)_minmax(300px,1.8fr)]">
        <Card className="p-5">
          <p className="text-[13px] text-[#A1A9B8]">Matching jobs</p>
          <p className="mt-3 font-mono text-[50px] font-semibold leading-none tracking-[-0.055em]">27</p>
          <p className="mt-2 text-[13px] text-[#A1A9B8]">9 above 80%</p>
          <div className="mt-5 flex items-center gap-2 text-xs text-teal-200">
            <span className="size-1.5 rounded-full bg-teal-300" />
            Across 7 job boards
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="min-w-0 truncate text-[13px] text-[#A1A9B8]">
              Primary resume <span aria-hidden="true">·</span> Backend_Engineer_2026.pdf
            </p>
            <span className="rounded-md border border-[#292F3A] bg-[#101319] px-2 py-1 text-[11px] text-[#A1A9B8]">
              PDF
            </span>
          </div>
          <div className="mb-2 mt-4 flex items-center justify-between gap-3 text-sm">
            <span className="font-medium">Profile completeness</span>
            <span className="font-mono text-lime-200">86%</span>
          </div>
          <Progress label="Profile completeness" value={86} />
          <p className="mt-3 text-[13px] leading-relaxed text-[#A1A9B8]">
            Add a certifications section to reach 100%.
          </p>
        </Card>
      </section>

      <section aria-labelledby="strongest-matches" className="mt-8">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 id="strongest-matches" className="text-[21px] font-semibold tracking-[-0.025em]">
              Strongest matches
            </h2>
            <p className="mt-1 text-xs text-[#707989]">Ranked by skills, experience, and role demand</p>
          </div>
          <Button className="hidden sm:inline-flex" onClick={() => navigate("/matches")} size="sm" variant="ghost">
            All 27 matches <ChevronRight aria-hidden="true" className="size-4" />
          </Button>
        </div>

        <div className="grid gap-2.5">
          {strongestMatches.map((job) => (
            <MatchRow
              key={job.id}
              isSaved={savedJobIds.includes(job.id)}
              job={job}
              onToggleSave={() => handleSave(job.id, job.title)}
            />
          ))}
        </div>
      </section>

      <section aria-label="Career insight and quick actions" className="mt-7 grid gap-3 lg:grid-cols-2">
        <Card className="p-5">
          <CardHeader className="p-0">
            <CardTitle className="flex items-center gap-2 text-[17px]">
              <span className="grid size-8 place-items-center rounded-lg bg-teal-300/10 text-teal-200">
                <Sparkles aria-hidden="true" className="size-4" />
              </span>
              AI career insight
            </CardTitle>
            <CardDescription className="pt-1 text-[13px] leading-[1.7]">
              Kubernetes appears in 6 of your top 9 matches. Naming your container orchestration exposure, if you have any, would lift several scores.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="p-5">
          <CardHeader className="p-0">
            <CardTitle className="text-[17px]">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => navigate("/resumes")} size="sm" variant="secondary">
                <FileText aria-hidden="true" className="size-4" /> Upload resume
              </Button>
              <Button onClick={() => navigate("/jobs")} size="sm" variant="outline">
                <Search aria-hidden="true" className="size-4" /> Search jobs
              </Button>
              <Button onClick={() => navigate("/optimizer")} size="sm" variant="default">
                <Sparkles aria-hidden="true" className="size-4" /> Optimize top match
              </Button>
            </div>
            <p className="mt-4 text-xs text-[#707989]">
              {savedJobIds.length} saved {savedJobIds.length === 1 ? "job" : "jobs"}
              <span className="mx-2 text-[#3A4252]">·</span>
              Recently found: Remotive, Jobicy, The Muse
            </p>
          </CardContent>
        </Card>
      </section>

      <div className="mt-6 flex items-center gap-2 text-[11px] text-[#707989]">
        <Check aria-hidden="true" className="size-3.5 text-teal-300" />
        Prototype uses mock job data; saved jobs are stored in this browser.
      </div>
    </div>
  )
}
