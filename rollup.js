const
  rollup = require('rollup'),
  buble = require('rollup-plugin-buble'),
  alias = require('rollup-plugin-alias')

const
  packageRiotRoute = 'packages/riot-route',
  packageRiotRouteTag = 'packages/riot-route-tag'

rollup
  .rollup({
    entry: 'lib/index.js',
    plugins: [
      alias({ 'riot-observable': 'node_modules/riot-observable/dist/es6.observable.js' }),
      buble()
    ]
  })
  .then(bundle => {
    bundle.write({ format: 'iife', moduleName: 'route', dest: `${ packageRiotRoute }/route.js` })
    bundle.write({ format: 'amd', dest: `${ packageRiotRoute }/amd.route.js` })
  })
  .catch(error => {
    console.error(error)
  })

rollup
  .rollup({
    entry: 'lib/index.js',
    external: ['riot-observable'],
    plugins: [buble()]
  })
  .then(bundle => {
    bundle.write({ format: 'es', dest: `${ packageRiotRoute}/index.js` })
    bundle.write({ format: 'cjs', dest: `${ packageRiotRoute }/cjs.route.js` })
  })
  .catch(error => {
    console.error(error)
  })
