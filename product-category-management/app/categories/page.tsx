import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategories } from "@/lib/api"
import { Edit, Plus } from "lucide-react"
import Link from "next/link"
import DeleteCategoryButton from "./delete-category-button"

export default async function CategoriesPage() {
  const categories = await getCategories().catch(() => [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Link href="/categories/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="flex h-[400px] w-full items-center justify-center rounded-md border border-dashed">
          <div className="text-center">
            <h3 className="text-lg font-medium">No categories found</h3>
            <p className="text-sm text-muted-foreground">Get started by creating a new category.</p>
            <Link href="/categories/new" className="mt-4 inline-block">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="pb-3">
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-6">{category.description}</p>
                <div className="flex justify-end space-x-2">
                  <Link href={`/categories/${category.id}/edit`}>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>
                  <DeleteCategoryButton id={category.id!} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
