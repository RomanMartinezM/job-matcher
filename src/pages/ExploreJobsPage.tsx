import { jobs } from "@/data/jobs"
import { useState } from "react"
import { useAppStore } from "@/store/useAppStore"

export function ExploreJobsPage() {
    const savedJobIds = useAppStore((state) => state.savedJobIds)
    const toggleSavedJob = useAppStore((state) => state.toggleSavedJob)
    const [search, setSearch] = useState("")
    const [source, setSource] = useState("All sources")
    const [minimumSalary, setMinimumSalary] = useState(0)
    const [remoteOnly, setRemoteOnly] = useState(false)
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = `${job.title} ${job.company} ${job.skills.join(" ")}`
          .toLowerCase()
          .includes(search.toLowerCase())
      
        const matchesSource = source === "All sources" || job.source === source
        const startingSalary = Number(job.salary.match(/\d+/)?.[0] ?? 0)
        const matchesSalary = startingSalary >= minimumSalary
        const matchesRemote =
            !remoteOnly || job.location.toLowerCase().includes("remote")
        
        return matchesSearch && matchesSource && matchesSalary && matchesRemote
      })

    const selectedJob = filteredJobs.find((job) => job.id === selectedJobId) ?? filteredJobs[0]
    
    return (
      <main>
        <h1>Explore jobs</h1>
        <input
            aria-label="Search jobs"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Title, skill or keyword"
            value={search}
        />
        <select
            aria-label="Filter by source"
            onChange={(event) => setSource(event.target.value)}
            value={source}
        >
            <option>All sources</option>
            <option>Adzuna</option>
            <option>Arbeitnow</option>
            <option>Jooble</option>
            <option>Reed</option>
            <option>Remotive</option>
            <option>Jobicy</option>
            <option>The Muse</option>
        </select>

        <select
            aria-label="Minimum salary"
            onChange={(event) => setMinimumSalary(Number(event.target.value))}
            value={minimumSalary}
        >
            <option value={0}>Any salary</option>
            <option value={100}>$100k+</option>
            <option value={140}>$140k+</option>
        </select>

        <button
            aria-pressed={remoteOnly}
            onClick={() => setRemoteOnly((current) => !current)}
            type="button"
        >
            {remoteOnly ? "Remote only ✓" : "Remote only"}
        </button>

        <p>{filteredJobs.length} jobs</p>
  
        {filteredJobs.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            {/* First grid column: your existing list */}
            <ul>
                {filteredJobs.map((job) => (
                <li
                    key={job.id}
                    className="flex items-center gap-4 rounded-xl border border-[#292F3A] bg-[#151922] p-4"
                >
                    <div
                        aria-hidden="true"
                        className="grid size-10 shrink-0 place-items-center rounded-lg text-sm font-semibold text-white"
                        style={{ backgroundColor: job.color }}
                    >
                        {job.company
                        .split(/\s+/)
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <button
                        className={`flex items-center gap-4 rounded-xl border bg-[#151922] p-4 ${
                            selectedJobId === job.id
                            ? "border-teal-300 ring-1 ring-teal-300/30"
                            : "border-[#292F3A]"
                        }`}
                        onClick={() => setSelectedJobId(job.id)}
                        type="button"
                        >
                        <h2 className="truncate font-semibold">{job.title}</h2>

                        <p className="mt-1 text-sm text-[#A1A9B8]">
                        {job.company} · {job.location} · Full-time · via {job.source}
                        </p>

                        <p className="mt-1 font-semibold">{job.salary}</p>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {job.skills.map((skill) => (
                                <span
                                className="rounded-md border border-[#292F3A] bg-[#1C222D] px-2 py-1 text-xs text-[#A1A9B8]"
                                key={skill}
                                >
                                {skill}
                                </span>
                            ))}
                        </div>
                    </button>
                    <button
                        aria-label={savedJobIds.includes(job.id) ? `Unsave ${job.title}` : `Save ${job.title}`}
                        aria-pressed={savedJobIds.includes(job.id)}
                        onClick={() => toggleSavedJob(job.id)}
                        type="button"
                        >
                        {savedJobIds.includes(job.id) ? "Saved" : "Save"}
                    </button>
                </li>
                ))}
            </ul>
            {/* Second grid column: add the details panel here */}
            <aside className="rounded-xl border border-[#292F3A] bg-[#151922] p-5">
                {selectedJob ? (
                    <>
                    <h2>{selectedJob.title}</h2>
                    <p>{selectedJob.company} · {selectedJob.location}</p>
                    <p>{selectedJob.salary}</p>

                    <h3>Required skills</h3>
                    <ul>
                        {selectedJob.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                        ))}
                    </ul>
                    </>
                ) : (
                    <p>Select a job to see its details.</p>
                )}
            </aside>
        </div>
        ) : (
        <p>No jobs match your search. Try another keyword.</p>
        )}
      </main>
    )
  }