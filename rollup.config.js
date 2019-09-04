import { terser } from "rollup-plugin-terser";
import html from 'rollup-plugin-bundle-html';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import image from 'rollup-plugin-img';
import { string } from "rollup-plugin-string";

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
    dest: "dist",
    inject: 'body',
  }),
  image({
    limit: 10000
  }),
  serve({
    open: true,
    contentBase: 'dist',
  }),
  livereload({
    watch: 'dist',
  }),
  string({
    include: ['**/*.frag', '**/*.vert'],
  }),
];

module.exports = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/game.js',
      format: 'iife',
      sourcemap: 'inline',
    },
    plugins
  },
  {
    input: 'src/lib/assets-loader.js',
    output: {
      file: 'dist/assets-loader.js',
      format: 'esm',
    },
    plugins: [
      terser(options),
    ]
  },
];
