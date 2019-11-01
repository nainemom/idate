import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import babelPreset from '@babel/preset-env'

function configCreator (input, output) {
  return {
    input: input,
    output: {
      file: output,
      format: 'cjs',
      compact: true
    },
    plugins: [
      babel({
        presets: [babelPreset],
        babelrc: false,
        exclude: 'node_modules/**'
      }),
      uglify({
        mangle: {
          toplevel: true
        },
        compress: {
          toplevel: true,
          unsafe_math: true,
          unsafe_undefined: true
        }
      })
    ]
  }
}
export default [
  configCreator('src/index.js', 'dist/index.js'),
  configCreator('src/idate.js', 'dist/idate.js'),
  configCreator('src/jalali.js', 'dist/jalali.js'),
  configCreator('src/hijri.js', 'dist/hijri.js')
]
