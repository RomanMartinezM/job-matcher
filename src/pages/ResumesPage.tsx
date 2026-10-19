import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { FileText, FileUp, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

type ResumeDraft = {
  id: number
  name: string
  role: string
  summary: string
}

export function ResumesPage() {
  const fileInput = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [drafts, setDrafts] = useState<ResumeDraft[]>([])
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [summary, setSummary] = useState("")
  const [fileError, setFileError] = useState("")

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const validType = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)
    const validExtension = /\.(pdf|docx)$/i.test(file.name)
    if (!validType && !validExtension) {
      setFileError("Choose a PDF or DOCX file.")
      setSelectedFile(null)
      event.target.value = ""
      return
    }

    setFileError("")
    setSelectedFile(file)
  }

  function createDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setDrafts((current) => [...current, { id: Date.now(), name, role, summary }])
    setName("")
    setRole("")
    setSummary("")
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-5xl py-2 sm:py-5">
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.035em] sm:text-[34px]">My resumes</h1>
          <p className="mt-2 text-sm text-[#A1A9B8] sm:text-base">Build a new resume or bring in one you already have.</p>
        </div>
        {!showForm && (
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => fileInput.current?.click()} variant="outline">
              <FileUp aria-hidden="true" className="size-4" /> Upload resume
            </Button>
            <Button onClick={() => setShowForm(true)}>
              <Plus aria-hidden="true" className="size-4" /> Create resume
            </Button>
          </div>
        )}
      </header>

      <input
        ref={fileInput}
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="sr-only"
        onChange={selectFile}
        type="file"
      />

      {showForm ? (
        <Card>
          <CardContent className="p-5 sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl">Start your resume</CardTitle>
                <p className="mt-2 text-sm text-[#A1A9B8]">Add the basics first. You can fill in the rest as you go.</p>
              </div>
              <Button aria-label="Close resume form" onClick={() => setShowForm(false)} size="icon" variant="ghost">
                <X aria-hidden="true" className="size-4" />
              </Button>
            </div>
            <form className="grid gap-4" onSubmit={createDraft}>
              <label className="grid gap-2 text-sm font-medium sm:max-w-xl">
                Resume name
                <input
                  autoFocus
                  className="min-h-11 rounded-[10px] border border-[#292F3A] bg-[#101319] px-3 text-[#F5F7FA] placeholder:text-[#707989] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Product Designer"
                  required
                  value={name}
                />
              </label>
              <label className="grid gap-2 text-sm font-medium sm:max-w-xl">
                Target role
                <input
                  className="min-h-11 rounded-[10px] border border-[#292F3A] bg-[#101319] px-3 text-[#F5F7FA] placeholder:text-[#707989] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
                  onChange={(event) => setRole(event.target.value)}
                  placeholder="e.g. Senior Product Designer"
                  required
                  value={role}
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Professional summary <span className="font-normal text-[#707989]">Optional</span>
                <textarea
                  className="min-h-28 resize-y rounded-[10px] border border-[#292F3A] bg-[#101319] px-3 py-2 text-[#F5F7FA] placeholder:text-[#707989] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
                  onChange={(event) => setSummary(event.target.value)}
                  placeholder="A short introduction to your experience and strengths"
                  value={summary}
                />
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                <Button type="submit"><FileText aria-hidden="true" className="size-4" /> Save draft</Button>
                <Button onClick={() => setShowForm(false)} variant="secondary">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="px-6 py-8 sm:px-10 sm:py-11">
              <div className="mx-auto max-w-2xl text-center">
                <div aria-hidden="true" className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl border border-lime-300/20 bg-lime-300/[0.08] text-lime-200">
                  <FileText className="size-6" strokeWidth={1.7} />
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-[30px]">Your next opportunity starts here.</h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#A1A9B8] sm:text-base">
                  Create an ATS-friendly resume from scratch, or use an existing PDF or DOCX as your starting point.
                </p>
              </div>

              <div className="mx-auto mt-8 grid max-w-3xl divide-y divide-[#292F3A] overflow-hidden rounded-xl border border-[#292F3A] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <section className="flex flex-col items-start gap-3 p-5 sm:p-6">
                  <div>
                    <h3 className="text-base font-semibold">Create from scratch</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#A1A9B8]">Start with your role and summary, then build out your experience.</p>
                  </div>
                  <Button className="mt-auto" onClick={() => setShowForm(true)}>
                    <Plus aria-hidden="true" className="size-4" /> Create resume
                  </Button>
                </section>
                <section className="flex flex-col items-start gap-3 p-5 sm:p-6">
                  <div>
                    <h3 className="text-base font-semibold">Upload an existing resume</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#A1A9B8]">Choose a PDF or DOCX file from your device.</p>
                  </div>
                  <Button className="mt-auto" onClick={() => fileInput.current?.click()} variant="secondary">
                    <FileUp aria-hidden="true" className="size-4" /> Choose a file
                  </Button>
                </section>
              </div>

              {fileError && <p className="mx-auto mt-4 max-w-3xl text-sm text-rose-300" role="alert">{fileError}</p>}
              {selectedFile && (
                <div className="mx-auto mt-4 flex max-w-3xl items-center justify-between gap-3 rounded-lg border border-teal-300/25 bg-teal-300/[0.06] px-4 py-3 text-sm" aria-live="polite">
                  <span className="min-w-0 truncate text-teal-100">Selected: {selectedFile.name}</span>
                  <Button
                    aria-label="Remove selected file"
                    onClick={() => {
                      setSelectedFile(null)
                      if (fileInput.current) fileInput.current.value = ""
                    }}
                    size="icon"
                    variant="ghost"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {drafts.length > 0 && (
        <section aria-labelledby="drafts-heading" className="mt-9">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold" id="drafts-heading">Your drafts</h2>
            <span className="text-xs text-[#707989]">This session</span>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {drafts.map((draft) => (
              <li className="rounded-xl border border-[#292F3A] bg-[#151922] p-4" key={draft.id}>
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#1C222D] text-teal-200">
                    <FileText aria-hidden="true" className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{draft.name}</p>
                    <p className="mt-1 truncate text-sm text-[#A1A9B8]">{draft.role}</p>
                    {draft.summary && <p className="mt-2 line-clamp-2 text-sm text-[#A1A9B8]">{draft.summary}</p>}
                    <span className="mt-3 inline-flex rounded-md border border-lime-300/20 bg-lime-300/[0.08] px-2 py-1 text-xs text-lime-200">Draft</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
