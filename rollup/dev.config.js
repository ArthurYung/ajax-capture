import server from 'rollup-plugin-serve'
import reload from 'rollup-plugin-livereload'

export default {
  output: {
    dir: "dist",
    format: "iife",
    name: 'jac',
    exports: "default",
    globals: {
      'bowser': 'Bowser'
    }
  },
  plugins: [
    server({
      contentBase: ['example', 'dist'],
    }),
    reload({
      watch: 'dist'
    })
  ]
}
