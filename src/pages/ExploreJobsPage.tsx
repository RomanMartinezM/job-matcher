import { candidateSkills, jobs, rankJobs } from "@/data/jobs"
import { useState } from "react"
import { useAppStore } from "@/store/useAppStore"
import { useNavigate } from "react-router-dom"

export function ExploreJobsPage() {
    const navigate = useNavigate()
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

    function resetFilters() {
        setSearch("")
        setSource("All sources")
        setMinimumSalary(0)
        setRemoteOnly(false)
      }

    const selectedJob = filteredJobs.find((job) => job.id === selectedJobId) ?? filteredJobs[0]
    const selectedMatch = selectedJob ? rankJobs([selectedJob])[0]?.matchPercent : undefined
    
    return (
      <main>
        <h1 className="mb-5 text-3xl font-semibold tracking-[-0.04em] sm:text-[34px]">
            Explore jobs
        </h1>
        <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-[2fr_1fr_1fr_auto]">
            <input
                className="col-span-2 min-h-11 rounded-[10px] border border-[#292F3A] bg-[#101319] px-3 text-sm text-[#F5F7FA] placeholder:text-[#707989] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300 md:col-span-1"
                aria-label="Search jobs"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Title, skill or keyword"
                value={search}
            />
            <select
                className="min-h-11 rounded-[10px] border border-[#292F3A] bg-[#101319] px-3 text-sm text-[#F5F7FA] placeholder:text-[#707989] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
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
                className="min-h-11 rounded-[10px] border border-[#292F3A] bg-[#101319] px-3 text-sm text-[#F5F7FA] placeholder:text-[#707989] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
                aria-label="Minimum salary"
                onChange={(event) => setMinimumSalary(Number(event.target.value))}
                value={minimumSalary}
            >
                <option value={0}>Any salary</option>
                <option value={100}>$100k+</option>
                <option value={140}>$140k+</option>
            </select>

            <button
                className={`rounded-lg border px-3 py-2 text-sm ${
                    remoteOnly
                      ? "border-teal-300 bg-teal-300/10 text-teal-200"
                      : "border-[#292F3A] text-[#F5F7FA]"
                  }`}
                aria-pressed={remoteOnly}
                onClick={() => setRemoteOnly((current) => !current)}
                type="button"
            >
                {remoteOnly ? "Remote only ✓" : "Remote only"}
            </button>
        </div>
        <p className="mb-2 text-xs text-[#A1A9B8]">
            {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
        </p>
  
        {filteredJobs.length > 0 ? (
        <div className="grid items-start gap-4 lg:grid-cols-[1.3fr_1fr]">
            {/* First grid column: your existing list */}
            <ul className="grid gap-2.5">
                {filteredJobs.map((job) => (
                    <li
                        key={job.id}
                        className={`flex items-center gap-4 rounded-xl border bg-[#151922] p-4 ${
                            selectedJob?.id === job.id
                            ? "border-teal-300 ring-1 ring-teal-300/30"
                            : "border-[#292F3A]"
                        }`}
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
                        className="min-w-0 flex-1 text-left"
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
                            className={`shrink-0 rounded-lg border px-3 py-2 text-sm ${
                                savedJobIds.includes(job.id)
                                ? "border-lime-300/30 bg-lime-300/10 text-lime-200"
                                : "border-[#292F3A] text-[#F5F7FA]"
                            }`}
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
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {selectedJob.title}
                    </h2>
                    <p className="mt-1 text-sm text-[#A1A9B8]">
                        {selectedJob.company} · {selectedJob.location}
                    </p>
                    <p className="my-3 text-sm font-semibold">
                        {selectedJob.salary}
                    </p>

                    <h3 className="mb-1 mt-4 text-xs text-[#A1A9B8]">
                        Required skills
                    </h3>
                    
                    <div className="flex flex-wrap gap-1.5">
                        {selectedJob.skills.map((skill) => {
                            const isMatched = candidateSkills.has(skill)

                            return (
                            <span
                                className={`rounded-md border px-2 py-1 text-xs ${
                                isMatched
                                    ? "border-teal-300/30 bg-teal-300/10 text-teal-200"
                                    : "border-[#292F3A] bg-[#1C222D] text-[#A1A9B8]"
                                }`}
                                key={skill}
                            >
                                {skill}
                            </span>
                            )
                        })}
                    </div>
                    {selectedMatch !== undefined && (
                        <p className="mt-4 rounded-lg bg-teal-300/[0.08] p-3 text-xs text-teal-200">
                            You match {selectedMatch}% · highlighted skills are on your resume
                        </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                        <button
                            className="rounded-lg bg-lime-300 px-4 py-2 font-semibold text-[#101319]"
                            onClick={() => window.alert(`Applying on ${selectedJob.source}`)}
                            type="button"
                        >
                            Apply on {selectedJob.source}
                        </button>

                        <button
                            className="rounded-lg border border-[#292F3A] px-4 py-2 font-semibold text-[#F5F7FA]"
                            onClick={() => navigate("/optimizer")}
                            type="button"
                        >
                            Optimize resume
                        </button>
                    </div>

                    </>
                ) : (
                    <p>Select a job to see its details.</p>
                )}
            </aside>
        </div>
        ) : (
        <div className="rounded-xl border border-[#292F3A] bg-[#151922] p-8 text-center">
            <h2 className="font-semibold">No jobs match those filters</h2>
            <p className="mt-2 text-sm text-[#A1A9B8]">
                Try changing your search or removing a filter.
            </p>
            <button
                className="mt-4 rounded-lg border border-[#292F3A] px-4 py-2 text-sm text-[#F5F7FA]"
                onClick={resetFilters}
                type="button"
            >
                Reset filters
            </button>
        </div>
        )}

      </main>
    )
  }