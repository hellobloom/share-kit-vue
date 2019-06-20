const path = require('path')
module.exports = ({config}) => {
  config.module.rules.unshift({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('ts-loader'),
    options: {configFile: path.join(__dirname, '../', 'tsconfig.json')},
  })
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
