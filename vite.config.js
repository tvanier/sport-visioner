import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
  base: '',
  plugins: [
    svelte({
      emitCss: false
    })
  ],
  resolve: {
    conditions: ['browser']
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['vitest-canvas-mock']
    },
    // For this config, check https://github.com/vitest-dev/vitest/issues/740
    threads: false,
    environmentOptions: {
      jsdom: {
        resources: 'usable'
      }
    }
  }
}))
