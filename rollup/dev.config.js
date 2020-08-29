import server from 'rollup-plugin-serve'
import reload from 'rollup-plugin-livereload'

export default {
  output: {
    dir: "dist",
    format: "iife",
    name: 'AC',
    exports: "default"
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
