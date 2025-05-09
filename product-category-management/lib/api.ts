
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export interface Category {
  id?: number
  name: string
  description: string
  products?: Product[]
}

export interface Product {
  id?: number
  name: string
  description: string
  price: number
  quantity: number
  category?: Category | null
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error")
    console.error(`API Error (${response.status}): ${errorText}`)
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

// API functions for Categories
export async function getCategories(): Promise<Category[]> {
  console.log(`Fetching categories from: ${API_BASE_URL}/categories`)
  const response = await fetch(`${API_BASE_URL}/categories`, {
    cache: "no-store",
  })
  return handleResponse<Category[]>(response)
}

export async function getCategory(id: number): Promise<Category> {
  console.log(`Fetching category ${id} from: ${API_BASE_URL}/categories/${id}`)
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    cache: "no-store",
  })
  return handleResponse<Category>(response)
}

export async function createCategory(category: Category): Promise<Category> {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  })
  return handleResponse<Category>(response)
}

export async function updateCategory(id: number, category: Category): Promise<Category> {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  })
  return handleResponse<Category>(response)
}

export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error(`Failed to delete category with id ${id}`)
  }
}

// API functions for Products
export async function getProducts(): Promise<Product[]> {
  console.log(`Fetching products from: ${API_BASE_URL}/products`)
  const response = await fetch(`${API_BASE_URL}/products`, {
    cache: "no-store",
  })
  return handleResponse<Product[]>(response)
}

export async function getProduct(id: number): Promise<Product> {
  console.log(`Fetching product ${id} from: ${API_BASE_URL}/products/${id}`)
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    cache: "no-store",
  })
  return handleResponse<Product>(response)
}

export async function createProduct(product: Product): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
  return handleResponse<Product>(response)
}

export async function updateProduct(id: number, product: Product): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
  return handleResponse<Product>(response)
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error(`Failed to delete product with id ${id}`)
  }
}
