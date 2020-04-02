const path = require('path')

/**
 * Add project README as documentation's introduction page
 */
module.exports = {
  name: 'internal-plugin',
  additionalPages: [
    {
     path: '/guide/',
     filePath: path.resolve(__dirname, '../../README.md')
    }
  ]
}
