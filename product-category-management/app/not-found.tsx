import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-muted-foreground">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/" className="mt-8">
        <Button>Return to Dashboard</Button>
      </Link>
    </div>
  )
}
