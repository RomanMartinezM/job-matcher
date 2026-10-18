export type Job = {
  id: number
  company: string
  title: string
  location: string
  salary: string
  source: string
  color: string
  skills: string[]
  experienceFit: number
  demandFit: number
}

// These are the original HTML prototype's mock listings and skill profile.
export const candidateSkills = new Set([
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "AWS",
  "TypeScript",
  "React",
  "SQL",
  "CI/CD",
  "Pytest",
])

export const jobs: Job[] = [
  {
    id: 1,
    company: "Northwind Labs",
    title: "Python Backend Developer",
    location: "Remote",
    salary: "$135–165k",
    source: "Remotive",
    color: "#0F5F52",
    skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "Redis", "Kubernetes"],
    experienceFit: 100,
    demandFit: 98,
  },
  {
    id: 2,
    company: "Lumen Health",
    title: "Platform Engineer",
    location: "Berlin, DE",
    salary: "$120–148k",
    source: "Arbeitnow",
    color: "#2B4C9B",
    skills: ["Python", "Docker", "AWS", "CI/CD", "Terraform", "Kubernetes"],
    experienceFit: 90,
    demandFit: 80,
  },
  {
    id: 3,
    company: "Fable & Co",
    title: "Full-Stack Engineer",
    location: "London, UK",
    salary: "$110–135k",
    source: "Reed",
    color: "#8A3410",
    skills: ["TypeScript", "React", "Python", "PostgreSQL", "GraphQL"],
    experienceFit: 95,
    demandFit: 75,
  },
  {
    id: 4,
    company: "Quill Data",
    title: "Data Engineer",
    location: "Remote (EU)",
    salary: "$105–130k",
    source: "Jobicy",
    color: "#6B3FA0",
    skills: ["Python", "SQL", "AWS", "Airflow", "Spark"],
    experienceFit: 80,
    demandFit: 70,
  },
  {
    id: 5,
    company: "Stackhaus",
    title: "Backend Engineer, Payments",
    location: "Amsterdam, NL",
    salary: "$128–152k",
    source: "The Muse",
    color: "#B4491F",
    skills: ["Python", "PostgreSQL", "Docker", "Pytest", "Kafka"],
    experienceFit: 95,
    demandFit: 92,
  },
  {
    id: 6,
    company: "Orbit AI",
    title: "ML Platform Engineer",
    location: "Remote",
    salary: "$150–185k",
    source: "Adzuna",
    color: "#475569",
    skills: ["Python", "Docker", "Kubernetes", "PyTorch", "AWS"],
    experienceFit: 70,
    demandFit: 55,
  },
  {
    id: 7,
    company: "Cobalt Street",
    title: "Junior API Developer",
    location: "Dublin, IE",
    salary: "$70–90k",
    source: "Jooble",
    color: "#0E7490",
    skills: ["Python", "SQL", "Git", "FastAPI"],
    experienceFit: 60,
    demandFit: 80,
  },
]

export type RankedJob = Job & {
  matchPercent: number
  matchedSkills: string[]
  missingSkills: string[]
}

export function rankJobs(list: Job[] = jobs): RankedJob[] {
  return list
    .map((job) => {
      const matchedSkills = job.skills.filter((skill) => candidateSkills.has(skill))
      const missingSkills = job.skills.filter((skill) => !candidateSkills.has(skill))
      const skillFit = Math.round((matchedSkills.length / job.skills.length) * 100)
      // This weighted score mirrors the prototype: skills 60%, experience 25%, demand 15%.
      const matchPercent = Math.round(
        skillFit * 0.6 + job.experienceFit * 0.25 + job.demandFit * 0.15,
      )

      return { ...job, matchPercent, matchedSkills, missingSkills }
    })
    .sort((first, second) => second.matchPercent - first.matchPercent)
}

export const strongestMatches = rankJobs().slice(0, 3)
