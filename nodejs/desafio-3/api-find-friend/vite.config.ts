import viteConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [viteConfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    dir: 'src',
  },
})
