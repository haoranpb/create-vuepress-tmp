const debug = require('debug')('create-vuepress:run')
const shell = require('shelljs')
const glob = require('glob')
const path = require('path')
const template = require('lodash.template')
const semverSatisfies = require('semver/functions/satisfies')
const { version } = require('../package.json')
const fs = require('fs-extra')

module.exports = function run({ answers, config }) {
  const cloneResult = shell.exec(
    `git clone --depth=1 --branch=${config.branch} ${answers.template} ${config.targetDir}`
  ).code

  if (cloneResult !== 0) process.exit(1)

  const cwd = process.cwd()
  debug('cwd:', cwd)

  fs.removeSync(path.join(cwd, config.targetDir, '.git'))
  console.log('Template .git folder removed')

  let defaultSetting = {
    glob: {
      pattern: '**',
      ignore: ['tmp-setting.json'],
    },
  }
  const tmpSettingFile = path.join(cwd, config.targetDir, 'tmp-setting.json')
  if (fs.existsSync(tmpSettingFile)) {
    const tmpSetting = fs.readJsonSync(tmpSettingFile)
    debug('Template Settings: %O', tmpSetting)

    if (!semverSatisfies(version, tmpSetting.version)) {
      console.warn(`
No version found in template setting or versions don't match

Note: since create-vuepress-tmp is still in v0.x, there may be some unexpected behaviours if versions don't match

  create-vuepress-tmp: ${version}
  template:            ${tmpSetting.version}
        `)
    }

    defaultSetting = Object.assign(defaultSetting, tmpSetting)
    debug('Default Settings: %O', defaultSetting)
  } else console.warn('No template setting found, fallback to default...')

  const templateFiles = glob.sync(defaultSetting.glob.pattern, {
    cwd: config.targetDir,
    dot: true,
    nodir: true,
    absolute: true,
    ignore: defaultSetting.glob.ignore,
  })
  debug(templateFiles)

  console.log('Compiling templates...')
  templateFiles.forEach((file) => {
    if (file.endsWith('package.json')) {
      fs.writeJsonSync(
        file,
        Object.assign(
          {
            name: answers.name,
            author: answers.author + ' <' + answers.mail + '>',
            description: answers.description,
            repository: answers.repository,
          },
          fs.readJsonSync(file)
        ),
        {
          spaces: '\t',
        }
      )
    }
    const compiled = template(fs.readFileSync(file, 'utf8'))
    fs.writeFileSync(file, compiled(answers))
  })

  if (config.install) {
    console.log('Installing denpendencies...')
    shell.exec(`cd ${config.targetDir} && ${answers.manager} install`)
  }

  if (config.remove) fs.remove(path.join(cwd, config.targetDir))
}
