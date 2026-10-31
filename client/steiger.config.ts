import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  // A small app has single-use slices on purpose: each feature is one user action.
  { rules: { 'fsd/insignificant-slice': 'off' } },
])
