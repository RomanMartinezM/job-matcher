import { candidateSkills, jobs } from "@/data/jobs"
import { useAppStore } from "@/store/useAppStore"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ResumeOptimizerPage() {
  const savedJobIds = useAppStore((state) => state.savedJobIds)

  const selectedJob =
    jobs.find((job) => savedJobIds.includes(job.id)) ?? jobs[0]
  const matchedSkills =
    selectedJob?.skills.filter((skill) => candidateSkills.has(skill)) ?? []
  
  const missingSkills =
    selectedJob?.skills.filter((skill) => !candidateSkills.has(skill)) ?? []
  const originalSummary = "Backend engineer with experience building Python APIs, working with PostgreSQL, and improving service reliability."
  const suggestedSummary = "Backend engineer building Python APIs and PostgreSQL services with a focus on reliability."
  const [summary, setSummary] = useState(originalSummary)  
  const [summarySuggestionStatus, setSummarySuggestionStatus] = useState<"pending" | "accepted" | "rejected">("pending")
  const originalExperience = "Worked on APIs for the billing team."
  const suggestedExperience =
    "Built and maintained APIs supporting the billing team."
  const [experienceBullet, setExperienceBullet] = useState(originalExperience)
  const [experienceSuggestionStatus, setExperienceSuggestionStatus] = useState<"pending" | "accepted" | "rejected">("pending")
  const acceptedSuggestions = [
    summarySuggestionStatus,
    experienceSuggestionStatus,
  ].filter((status) => status === "accepted").length
  const improvementScore = 76 + acceptedSuggestions * 8
  const atsChecksPassed = 1 + acceptedSuggestions

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
         {/* Left column */}
         <Card className="min-h-[500px] bg-[#F8FAFC] p-6 text-[#172033]">
          <h2 className="text-2xl font-bold tracking-tight text-[#172033]">
            Maya Okafor
          </h2>
          <p className="mt-1 border-b border-[#CBD5E1] pb-4 text-sm text-[#64748B]">
            Backend Engineer · Lisbon
          </p>

          <h3 className="mb-1 mt-4 text-xs font-semibold uppercase tracking-wide text-[#64748B]">
            Summary
          </h3>
          <p className="text-sm leading-relaxed">{summary}</p>

          <h3 className="mb-1 mt-6 text-xs font-semibold uppercase tracking-wide text-[#64748B]">
            Experience · Ledgerly
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
            <li>{experienceBullet}</li>
            <li>Helped move services to containers.</li>
            <li>Wrote Pytest suites covering API and database layers.</li>
          </ul>
        </Card>

        {/* Right column */}
        <div className="grid content-start gap-3">
          <Card className="p-5">
            <h2 className="font-semibold">Improvement score</h2>
            <p className="mt-2 text-2xl font-semibold text-teal-300">{improvementScore} / 100</p>

            <div
              aria-label="Improvement score: 76 out of 100"
              className="my-2 h-2 overflow-hidden rounded-full bg-[#232936]"
              role="img"
            >
            <div
              className="h-full rounded-full bg-teal-300"
              style={{ width: `${improvementScore}%` }}
            />
            </div>

            <p className="mt-2 text-sm leading-relaxed text-[#A1A9B8]">
              ATS check: single column, standard headings, no tables. Passed{" "}
              {atsChecksPassed} of 3.
            </p>
          </Card>

          {summarySuggestionStatus !== "rejected" && (
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
                  <Button
                    onClick={() => {
                      setSummary(suggestedSummary)
                      setSummarySuggestionStatus("accepted")
                    }}
                    size="sm"
                    variant="default"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => setSummarySuggestionStatus("rejected")}
                    size="sm"
                    variant="outline"
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <p className="mt-3 text-sm text-[#A1A9B8]">
                  Suggestion {summarySuggestionStatus}.
                </p>
              )}
            </Card>
          )}

          {experienceSuggestionStatus !== "rejected" && (
            <Card className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-200">
                Experience · Ledgerly
              </p>

              <p className="mt-3 text-sm text-[#A1A9B8]">
                Original: {originalExperience}
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                Suggested: {suggestedExperience}
              </p>

              {experienceSuggestionStatus === "pending" ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      setExperienceBullet(suggestedExperience)
                      setExperienceSuggestionStatus("accepted")
                    }}
                    size="sm"
                    variant="default"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => setExperienceSuggestionStatus("rejected")}
                    size="sm"
                    variant="outline"
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <p className="mt-3 text-sm text-[#A1A9B8]">
                  Suggestion {experienceSuggestionStatus}.
                </p>
              )}
            </Card>
          )}

          <Card className="p-4">
            <h2 className="font-semibold">Target job keywords</h2>

            <p className="mb-2 mt-3 text-xs text-[#A1A9B8]">
              Already in your resume
            </p>
            <div className="flex flex-wrap gap-1.5">
              {matchedSkills.map((skill) => (
                <span
                  className="rounded-md border border-teal-300/30 bg-teal-300/10 px-2 py-1 text-xs text-teal-200"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>

            <p className="mb-2 mt-4 text-xs text-[#A1A9B8]">
              Not in your resume (we won’t add these)
            </p>
            <div className="flex flex-wrap gap-1.5">
              {missingSkills.map((skill) => (
                <span
                  className="rounded-md border border-[#292F3A] bg-[#1C222D] px-2 py-1 text-xs text-[#A1A9B8]"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}