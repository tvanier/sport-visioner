import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
  base: '',
  plugins: [
    svelte({
      emitCss: false
    })
  ],
  // https://github.com/sveltejs/svelte/issues/11394
  resolve: {
    conditions: mode === 'test' ? ['browser'] : []
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
