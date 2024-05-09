import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import progress from 'rollup-plugin-progress';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(
  {
    input: ['src/octuple.ts', 'src/locale.ts'],
    output: [
      {
        chunkFileNames: '[name]-[hash].cjs',
        dir: 'lib',
        entryFileNames: '[name].cjs',
        format: 'cjs',
        sourcemap: false,
      },
      {
        chunkFileNames: '[name]-[hash].mjs',
        dir: 'lib',
        entryFileNames: '[name].mjs',
        format: 'es',
        sourcemap: false,
      },
    ],
    plugins: [
      progress(),
      postcss({
        modules: { localsConvention: 'camelCase' },
        minimize: true,
        extract: true,
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
        sourceMap: false,
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
      typescriptPaths(),
      url(), // TODO: audit if this is needed
      svgr(), // TODO: audit if this is needed
      terser(),
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
  },
  {
    // TODO: audit if this is needed (or add the same for lib/locale.d.ts)
    input: 'lib/octuple.d.ts',
    output: [{ file: 'lib/octuple.d.ts', format: 'esm' }],
    external: [/\.(css|less|scss)$/],
    plugins: [dts()],
  }
);
