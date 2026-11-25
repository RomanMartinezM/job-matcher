import { jobs } from "@/data/jobs"
import { useAppStore } from "@/store/useAppStore"
import { Card } from "@/components/ui/card"
import { useState } from "react"

export function ResumeOptimizerPage() {
  const savedJobIds = useAppStore((state) => state.savedJobIds)

  const selectedJob =
    jobs.find((job) => savedJobIds.includes(job.id)) ?? jobs[0]
  const originalSummary = "Backend engineer with experience building Python APIs, working with PostgreSQL, and improving service reliability."
  const suggestedSummary = "Backend engineer building Python APIs and PostgreSQL services with a focus on reliability."
  const [summary, setSummary] = useState(originalSummary)  
  const [summarySuggestionStatus, setSummarySuggestionStatus] = useState<"pending" | "accepted" | "rejected">("pending")

  return (
    <main className="mx-auto w-full max-w-[1180px]">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-[34px]">
            Resume optimizer
          </h1>
          {selectedJob && (
            <p className="mt-1 text-sm text-[#A1A9B8]">
              Tailoring for {selectedJob.title} at {selectedJob.company}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button className="rounded-lg border border-[#292F3A] px-3 py-2 text-sm">
            Export PDF
          </button>
          <button className="rounded-lg bg-lime-300 px-3 py-2 text-sm font-semibold text-[#101319]">
            Export DOCX
          </button>
        </div>
      </header>
      <Card className="border-teal-300/15 bg-teal-300/[0.06] p-4 text-sm leading-relaxed text-teal-100">
        We reword and reorder what is already in your resume. We never add skills or
        experience you have not told us about.
      </Card>

      <div className="mt-4 grid items-start gap-3 lg:grid-cols-[1.2fr_1fr]">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Maya Okafor</h2>
          <p className="mt-1 text-sm text-[#A1A9B8]">
            Backend Engineer · Lisbon
          </p>

          <h3 className="mb-1 mt-6 text-xs font-semibold uppercase tracking-wide text-[#A1A9B8]">
            Summary
          </h3>
          <p className="text-sm leading-relaxed">{summary}</p>

          <h3 className="mb-1 mt-6 text-xs font-semibold uppercase tracking-wide text-[#A1A9B8]">
            Experience · Ledgerly
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
            <li>Worked on APIs for the billing team.</li>
            <li>Helped move services to containers.</li>
            <li>Wrote Pytest suites covering API and database layers.</li>
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold">Improvement score</h2>
          <p className="mt-2 text-2xl font-semibold text-teal-300">76 / 100</p>
          <p className="mt-2 text-sm leading-relaxed text-[#A1A9B8]">
            ATS check: single column, standard headings, no tables. Passed 3 of 3.
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-200">
            Summary
          </p>

          <p className="mt-3 text-sm text-[#A1A9B8]">
            Original: Backend engineer with experience building Python APIs,
            working with PostgreSQL, and improving service reliability.
          </p>

          <p className="mt-2 text-sm leading-relaxed">
            Suggested: Backend engineer building Python APIs and PostgreSQL services
            with a focus on reliability.
          </p>

          {summarySuggestionStatus === "pending" ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                className="rounded-lg border border-teal-300/30 bg-teal-300/10 px-3 py-2 text-sm text-teal-100"
                onClick={() => {
                  setSummary(suggestedSummary)
                  setSummarySuggestionStatus("accepted")
                }}
                type="button"
              >
                Accept
              </button>
              <button
                className="rounded-lg border border-[#292F3A] px-3 py-2 text-sm text-[#F5F7FA]"
                onClick={() => setSummarySuggestionStatus("rejected")}
                type="button"
              >
                Reject
              </button>
            </div>
          ) : (
            <p className="mt-3 text-sm text-[#A1A9B8]">
              Suggestion {summarySuggestionStatus}.
            </p>
          )}
        </Card>
      </div>
    </main>
  )
}