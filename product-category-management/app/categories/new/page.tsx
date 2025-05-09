import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CategoryForm from "../category-form"

export default function NewCategoryPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Category</CardTitle>
          <CardDescription>Add a new product category to your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryForm />
        </CardContent>
      </Card>
    </div>
  )
}
