import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getProducts } from "@/lib/api"
import { Edit, Plus } from "lucide-react"
import Link from "next/link"
import DeleteProductButton from "./delete-product-button"
import { formatCurrency } from "@/lib/utils"

export default async function ProductsPage() {
  const products = await getProducts().catch(() => [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="flex h-[400px] w-full items-center justify-center rounded-md border border-dashed">
          <div className="text-center">
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-sm text-muted-foreground">Get started by creating a new product.</p>
            <Link href="/products/new" className="mt-4 inline-block">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader className="pb-3">
                <CardTitle>{product.name}</CardTitle>
                {product.category && (
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                    {product.category.name}
                  </span>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg font-bold">{formatCurrency(product.price)}</p>
                    <p className="text-sm text-muted-foreground">In stock: {product.quantity}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Link href={`/products/${product.id}/edit`}>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </Link>
                <DeleteProductButton id={product.id!} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
