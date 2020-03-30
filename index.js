const yParser = require('yargs-parser')
const semverSatisfies = require('semver/functions/satisfies')
const chalk = require('chalk')
const shell = require('shelljs')
const query = require('./lib/query')
const { name, version } = require('./package.json')
const debug = require('debug')

const args = yParser(process.argv.slice(2))

if (args.v || args.version) {
  console.log(name, version)
  process.exit(0)
}

if (args.d || args.debug) {
  debug.enable('create-vuepress:*')
}

if (!semverSatisfies(process.version, '>= 8.0.0')) {
  console.error(chalk.red('✘ Generator only works with Node v8.0.0 and up!'))
  process.exit(1)
}

if (!shell.which('git')) {
  console.error(chalk.red('✘ Generator needs git to work!'))
  process.exit(1)
}

query({
  targetDir: args._[0] || '.',
  debug: args.d || args.debug || false,
  remove: args.remove || false,
})
