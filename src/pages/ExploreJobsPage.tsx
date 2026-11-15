import { jobs } from "@/data/jobs"
import { useState } from "react"

export function ExploreJobsPage() {
    const [search, setSearch] = useState("")
    const [source, setSource] = useState("All sources")
    const [minimumSalary, setMinimumSalary] = useState(0)
    const [remoteOnly, setRemoteOnly] = useState(false)
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

                <div className="min-w-0 flex-1">
                    <h2 className="truncate font-semibold">{job.title}</h2>
                    <p className="mt-1 text-sm text-[#A1A9B8]">
                    {job.company} · {job.location} · Full-time · via {job.source}
                    </p>
                    <p className="mt-1 font-semibold">{job.salary}</p>
                </div>
            </li>
            ))}
        </ul>
        ) : (
        <p>No jobs match your search. Try another keyword.</p>
        )}
      </main>
    )
  }