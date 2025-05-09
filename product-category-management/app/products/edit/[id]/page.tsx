import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductForm from "../../product-form"
import { getProduct } from "@/lib/api"
import { notFound } from "next/navigation"

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    notFound()
  }

  try {
    const product = await getProduct(id)

    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
            <CardDescription>Update the details of your product</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductForm initialData={product} />
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error("Error fetching product:", error)
    notFound()
  }
}
