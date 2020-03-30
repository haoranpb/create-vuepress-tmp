const debug = require('debug')('create-vuepress:run')
const shell = require('shelljs')
const glob = require('glob')
const path = require('path')
const template = require('lodash.template')
const fs = require('fs-extra')

module.exports = function run({ answers, config }) {
  debug(answers)

  const cloneResult = shell.exec(
    'git clone --depth=1 --branch=master ' +
      answers.template +
      ' ' +
      config.targetDir
  ).code

  if (cloneResult !== 0) process.exit(1)

  const cwd = process.cwd()
  debug('cwd:', cwd)

  fs.removeSync(path.join(cwd, config.targetDir, '.git'))
  console.log('Template .git folder removed')

  const templateFiles = glob.sync('**', {
    cwd: config.targetDir,
    dot: true,
    nodir: true,
    absolute: true,
  })
  debug(templateFiles)

  console.log('Compiling templates...')
  templateFiles.forEach((file) => {
    const compiled = template(fs.readFileSync(file, 'utf8'))
    fs.writeFileSync(file, compiled(answers))
  })
  console.log('✨ Done')

  if (config.install)
    shell.exec('cd ' + config.targetDir + ' && ' + answers.manager + ' install')

  if (config.remove) fs.remove(path.join(cwd, config.targetDir))
}
