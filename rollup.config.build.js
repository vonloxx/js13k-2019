import { terser } from "rollup-plugin-terser";
import html from 'rollup-plugin-bundle-html';
import image from 'rollup-plugin-img';
import { string } from "rollup-plugin-string";
import stripCode from "rollup-plugin-strip-code";

const options = {
  mangle: {
    properties: false,
    toplevel: true,
  },
  compress: {
    passes: 2,
  },
  nameCache: {},
};

const plugins = [
  terser(options),
  html({
    template: 'src/index.html',
    dest: "dist/release",
    inject: 'body',
  }),
  image({
    limit: 10000
  }),
  string({
    include: ['**/*.frag', '**/*.vert'],
  }),
];

module.exports = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/release/bundle.js',
      format: 'iife',
      // sourcemap: 'inline',
    },
    plugins
  },
  {
    input: 'src/lib/assets-loader.js',
    output: {
      file: 'dist/release/assets-loader.js',
      format: 'esm',
      // sourcemap: 'inline',
    },
    plugins: [
      terser(options),
      stripCode({
        start_comment: 'start-test-code',
        end_comment: 'end-test-code'
      }),
    ],
  },
];
