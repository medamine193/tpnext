import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CategoryForm from "../../category-form"
import { getCategory } from "@/lib/api"
import { notFound } from "next/navigation"

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string }
}) {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    notFound()
  }

  try {
    const category = await getCategory(id)

    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Category</CardTitle>
            <CardDescription>Update the details of your product category</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryForm initialData={category} />
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error("Error fetching category:", error)
    notFound()
  }
}
