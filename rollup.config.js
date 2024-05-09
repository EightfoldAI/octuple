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

import pkg from './package.json' assert { type: 'json' };

export default defineConfig(
  {
    input: './src/octuple.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: false,
        exports: 'named',
        name: pkg.name,
      },
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
        sourcemap: false,
      },
    ],
    plugins: [
      postcss({
        minimize: true,
        extract: true,
        use: [['sass', { data: '@import "./src/styles/main.scss";' }]],
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
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
      url(),
      svgr(),
      terser(),
    ],
    // ignore warnings about "use client" directive
    onwarn(warning, warn) {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
        return;
      }
      warn(warning);
    },
  },
  {
    input: 'lib/esm/types/src/index.d.ts',
    output: [{ file: 'lib/index.d.ts', format: 'esm' }],
    external: [/\.(css|less|scss)$/],
    plugins: [dts()],
  }
);
