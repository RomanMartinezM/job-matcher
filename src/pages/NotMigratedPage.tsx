import { ArrowLeft, BookOpenText } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

export function NotMigratedPage({ title }: { title: string }) {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-2xl py-8 sm:py-14">
      <p className="mb-3 text-sm text-teal-200">Next migration exercise</p>
      <h1 className="text-3xl font-semibold tracking-[-0.04em]">{title}</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-[#A1A9B8]">
        This screen is still in the original HTML. The dashboard is the first migrated page; use this placeholder as your starting point for moving the next one.
      </p>
      <Card className="mt-7">
        <CardContent className="flex gap-4 p-5">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-lime-300/10 text-lime-200">
            <BookOpenText aria-hidden="true" className="size-5" />
          </span>
          <div>
            <CardTitle className="text-base">Try this in React</CardTitle>
            <p className="mt-2 text-sm leading-relaxed text-[#A1A9B8]">
              Create a component in <code className="rounded bg-[#232936] px-1.5 py-0.5 text-xs text-[#D9F99D]">src/pages</code>, then add a route in <code className="rounded bg-[#232936] px-1.5 py-0.5 text-xs text-[#D9F99D]">src/router.tsx</code>. The dashboard and its data are examples to follow.
            </p>
          </div>
        </CardContent>
      </Card>
      <Button className="mt-6" onClick={() => navigate("/")} variant="ghost">
        <ArrowLeft aria-hidden="true" className="size-4" /> Back to dashboard
      </Button>
    </div>
  )
}
