import { defineConfig } from 'vitest/config'
import viteConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [viteConfigPaths()],
})
