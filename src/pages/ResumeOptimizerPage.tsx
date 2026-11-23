import { jobs } from "@/data/jobs"
import { useAppStore } from "@/store/useAppStore"

export function ResumeOptimizerPage() {
  const savedJobIds = useAppStore((state) => state.savedJobIds)

  const selectedJob =
    jobs.find((job) => savedJobIds.includes(job.id)) ?? jobs[0]

  return (
    <main>
      <h1>Resume optimizer</h1>
      {selectedJob && (
        <p>
          Tailoring for {selectedJob.title} at {selectedJob.company}
        </p>
      )}
    </main>
  )
}