import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import progress from 'rollup-plugin-progress';
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * @type {import('rollup').OutputOptions
 */
const SHARED_OUTPUT_OPTIONS = {
  dir: 'lib',
  preserveModules: true,
  preserveModulesRoot: 'src',
  sourcemap: false,
};

export default defineConfig({
  input: ['src/octuple.ts', 'src/locale.ts'],
  output: [
    {
      ...SHARED_OUTPUT_OPTIONS,
      chunkFileNames: '[name]-[hash].cjs',
      entryFileNames: '[name].cjs',
      format: 'cjs',
    },
    {
      ...SHARED_OUTPUT_OPTIONS,
      chunkFileNames: '[name]-[hash].mjs',
      entryFileNames: '[name].mjs',
      format: 'es',
    },
  ],
  plugins: [
    progress(),
    postcss({
      modules: { localsConvention: 'camelCase' },
      minimize: true,
      extract: 'octuple.css',
      inject: false, // don't inject <style> tags for components
      // link the variable definitions to the source files (since main.scss is not imported in the library code)
      use: { sass: { data: '@import "./src/styles/main.scss";' } },
    }),
    peerDepsExternal(), // ensures peer deps like "react" and "react-dom" are not bundled
    resolve(),
    commonjs(),
    preserveDirectives(), // preserve "use client" directives
    typescript({
      tsconfig: './tsconfig.json',
      compilerOptions: {
        sourceMap: false,
      },
      exclude: [
        '.storybook',
        'storybook-static',
        'config',
        'coverage',
        'lib',
        'node_modules/**',
        '*.cjs',
        '*.mjs',
        '**/__snapshots__/**',
        '**/tests/**',
        '**/Tests/**',
        '**/*.test.js+(|x)',
        '**/*.test.ts+(|x)',
        '**/*.stories.ts+(|x)',
        '**/*.stories.js+(|x)',
      ],
    }),
    terser({ keep_fnames: true }),
    visualizer(),
  ],
  /**
   * Ignore warnings about "use client" directive, these are preserved by rollup-plugin-preserve-directives
   * @see https://github.com/Ephem/rollup-plugin-preserve-directives?tab=readme-ov-file#disabling-warnings
   */
  onwarn(warning, warn) {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
      return;
    }
    warn(warning);
  },
});
