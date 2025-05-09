"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { type Category, createCategory, updateCategory } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface CategoryFormProps {
  initialData?: Category
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<Category>({
    name: initialData?.name || "",
    description: initialData?.description || "",
  })

  const isEditing = !!initialData

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing && initialData?.id) {
        await updateCategory(initialData.id, formData)
        toast({
          title: "Category updated",
          description: "The category has been successfully updated.",
        })
      } else {
        await createCategory(formData)
        toast({
          title: "Category created",
          description: "The new category has been successfully created.",
        })
      }
      router.push("/categories")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} the category. Please try again.`,
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

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Category" : "Create Category"}
        </Button>
      </div>
    </form>
  )
}
