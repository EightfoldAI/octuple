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
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

/**
 * @type {import('rollup').OutputOptions}
 */
const SHARED_OUTPUT_OPTIONS = {
  dir: 'lib',
  sourcemap: false,
  preserveModules: true,
  preserveModulesRoot: 'src',
};

export default defineConfig(
  {
    input: 'src/octuple.ts',
    output: [
      {
        ...SHARED_OUTPUT_OPTIONS,
        format: 'cjs',
        entryFileNames: '[name].cjs',
        exports: 'auto',
      },
      {
        ...SHARED_OUTPUT_OPTIONS,
        format: 'es',
      },
    ],
    plugins: [
      postcss({
        minimize: true,
        extract: true,
        // link the variable definitions to the source files (since main.scss is not imported in the library code)
        use: [['sass', { data: '@import "./src/styles/main.scss";' }]],
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      preserveDirectives(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: false,
        exclude: [
          'coverage',
          '.storybook',
          'storybook-static',
          'config',
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
      url(),
      svgr(),
      terser(),
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
    input: 'lib/octuple.d.ts',
    output: [{ file: 'lib/octuple.d.ts', format: 'esm' }],
    external: [/\.(css|less|scss)$/],
    plugins: [dts()],
  }
);
