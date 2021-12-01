import buble from '@rollup/plugin-buble';
// import eslint from '@rollup/plugin-eslint';
import { terser } from 'rollup-plugin-terser';

const watchMode = !!process.env.ROLLUP_WATCH;

const generateConfig = (format, minify = false) => ({
  input: './src/index.js',
  output: {
    name: 'IDate',
    exports: 'default',
    file: `./dist/idate${format !== 'umd' ? `.${format}` : ''}${minify ? '.min' : ''}.js`,
    sourcemap: true,
    format,
    ...(minify && {
      plugins: [terser()],
    }),
  },
  plugins: [
    // eslint(),
    buble(),
  ],
});

export default [
  generateConfig('cjs'),
  ...(watchMode ? [] : [
    generateConfig('cjs', true),
    generateConfig('esm'),
    generateConfig('esm', true),
    generateConfig('umd'),
    generateConfig('umd', true),
  ]),
];
