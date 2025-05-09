"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutGrid, Package, Tag } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <Tag className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="p-6">
        <h1 className="text-xl font-bold">Product Manager</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium",
              pathname === route.path ? "bg-primary text-primary-foreground" : "hover:bg-muted",
            )}
          >
            {route.icon}
            <span className="ml-3">{route.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
