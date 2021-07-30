import vuePlugin from 'rollup-plugin-vue' // Handle .vue SFC files
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'


export default {
  input: 'src/index.ts',
  output: [
    {
      name: 'VueNextMEditor',
      file: pkg.unpkg,
      format: 'umd'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [
    typescript({
      sourceMap: false
    }),
    vuePlugin({
      include: 'src/**.vue',
      target: 'browser'
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    resolve(),
    commonjs(),
  ],
}
