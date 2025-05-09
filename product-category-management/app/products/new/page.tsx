import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductForm from "../product-form"

export default function NewProductPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
          <CardDescription>Add a new product to your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  )
}
