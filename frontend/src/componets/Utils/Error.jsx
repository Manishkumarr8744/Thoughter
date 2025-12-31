"use client"

import { AlertCircle, Home } from "lucide-react"

export default function Error({ error }) {
    console.log(error);
    
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="text-sm text-gray-600">{error}</p>

          
            <p className="text-xs text-gray-500">
              Status Code: 401
            </p>
          
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="mx-auto flex items-center gap-2 rounded-lg border px-5 py-2 text-sm font-medium hover:bg-gray-100 transition"
        >
          <Home className="h-4 w-4" />
          Go home
        </button>
      </div>
    </div>
  )
}
