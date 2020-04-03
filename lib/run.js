const debug = require('debug')('create-vuepress:run')
const shell = require('shelljs')
const chalk = require('chalk')
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
  const destDir = path.join(cwd, config.targetDir)
  debug('cwd:', cwd)

  fs.removeSync(path.join(destDir, '.git'))
  console.log('Template .git folder removed')

  const tmpSetting = resolveTmpSetting(destDir)
  tmpCompiler(tmpSetting, config.targetDir, answers)

  if (config.install) {
    console.log('Installing denpendencies. This may take a while...')
    shell.exec(`cd ${config.targetDir} && ${answers.manager} install`)
  }

  if (config.remove) fs.remove(destDir)
  else if (!config.debug) process.stdout.write('\x1Bc')

  console.log(`
Successfully created ${answers.name} at ${destDir}

  ${chalk.gray('# Enter the directory')}
  ${chalk.cyan('cd ') + config.targetDir}
  ${chalk.gray("# Install denpendencies if you didn't add -i / --install flag")}
  ${chalk.cyan('yarn install')}

  ${chalk.gray('# Start the dev server')}
  ${chalk.cyan('yarn docs:dev')}
  ${chalk.gray('# Build the docuentation site')}
  ${chalk.cyan('yarn docs:dev')}

  ${chalk.gray('# See more VuePress CLI commands')}
  ${chalk.cyan('yarn run vuepress --help')}
  ${chalk.gray(
    '# Or visit VuePress documentation site:',
    chalk.underline('https://vuepress.vuejs.org/')
  )}`)
}

/**
 * Compile template based on template setting and user answers
 */
function tmpCompiler(tmpSetting, targetDir, answers) {
  const templateFiles = glob.sync(tmpSetting.glob.pattern, {
    cwd: targetDir,
    dot: true,
    nodir: true,
    absolute: true,
    ignore: tmpSetting.glob.ignore,
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
}

/**
 * Resolve template setting
 */
function resolveTmpSetting(destDir) {
  const defaultSetting = {
    glob: {
      pattern: '**',
      ignore: ['tmp-setting.json'],
    },
  }

  const tmpSettingFile = path.join(destDir, 'tmp-setting.json')
  if (fs.existsSync(tmpSettingFile)) {
    const tmpSetting = fs.readJsonSync(tmpSettingFile)
    fs.removeSync(tmpSettingFile)
    debug('Template Settings: %O', tmpSetting)

    if (!semverSatisfies(version, tmpSetting.version)) {
      console.warn(`
${chalk.yellow("No version found in template setting or versions don't match")}
Note: since create-vuepress-tmp is still in v0.x, there may be some unexpected behaviours if versions don't match

  create-vuepress-tmp: ${chalk.green(version)}
  template:            ${chalk.yellow(tmpSetting.version)}`)
    }

    Object.assign(defaultSetting, tmpSetting)
    debug('Merged Settings: %O', defaultSetting)
  } else {
    console.warn(
      chalk.yellow('No template setting found, fallback to default...')
    )
  }

  return defaultSetting
}
