"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { type Category, type Product, createProduct, getCategories, updateProduct } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFormProps {
  initialData?: Product
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  const [formData, setFormData] = useState<Product>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    quantity: initialData?.quantity || 0,
    category: initialData?.category || null,
  })

  const isEditing = !!initialData

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load categories. Please refresh the page.",
          variant: "destructive",
        })
      }
    }

    fetchCategories()
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target

    if (name === "price" || name === "quantity") {
      setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) || 0 }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  function handleCategoryChange(value: string) {
    if (value === "none") {
      setFormData((prev) => ({ ...prev, category: null }))
    } else {
      const categoryId = Number.parseInt(value)
      const selectedCategory = categories.find((c) => c.id === categoryId)

      if (selectedCategory) {
        setFormData((prev) => ({
          ...prev,
          category: { id: selectedCategory.id, name: selectedCategory.name, description: selectedCategory.description },
        }))
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing && initialData?.id) {
        await updateProduct(initialData.id, formData)
        toast({
          title: "Product updated",
          description: "The product has been successfully updated.",
        })
      } else {
        await createProduct(formData)
        toast({
          title: "Product created",
          description: "The new product has been successfully created.",
        })
      }
      router.push("/products")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} the product. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category?.id?.toString() || ""} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id!.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  )
}
