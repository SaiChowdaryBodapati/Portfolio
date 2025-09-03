    import path from "path"
    import react from "@vitejs/plugin-react"
    import { defineConfig } from "vite"

    export default defineConfig({
      base: "/Portfolio/", // This is the line that fixes the blank page
      plugins: [react()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    })
