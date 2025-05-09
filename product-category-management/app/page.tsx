import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategories, getProducts } from "@/lib/api"
import { Package, Tag } from "lucide-react"
import Link from "next/link"

export default async function Dashboard() {
  // Fetch data in parallel
  const [products, categories] = await Promise.all([getProducts().catch(() => []), getCategories().catch(() => [])])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/products">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-bold">Products</CardTitle>
              <Package className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xl font-bold">{products.length}</CardDescription>
              <p className="text-sm text-muted-foreground">Total products in inventory</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/categories">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-bold">Categories</CardTitle>
              <Tag className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xl font-bold">{categories.length}</CardDescription>
              <p className="text-sm text-muted-foreground">Total product categories</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
