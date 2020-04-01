const inquirer = require('inquirer')
const shell = require('shelljs')
const debug = require('debug')('create-vuepress:query')
const run = require('./run.js')

module.exports = function query(config) {
  debug(config)

  inquirer
    .prompt([
      {
        name: 'template',
        message: 'Template Repository',
        default: 'https://github.com/ludanxer/vuepress-tmp',
      },
      {
        name: 'name',
        message: 'The name of your Project',
        default: config.targetDir,
      },
      {
        name: 'description',
        message: 'The description of your Project',
      },
      {
        name: 'author',
        message: 'The author of your Project',
        default: () => {
          const result = shell
            .exec('npm config get init.author.name', {
              silent: true,
            })
            .stdout.split('\n')[0]

          if (result !== 'undefined') return result
        },
      },
      {
        name: 'mail',
        message: 'The email address of the author',
        when: ({ author }) => author.length > 0,
        default: () => {
          const result = shell
            .exec('npm config get init.author.email', {
              silent: true,
            })
            .stdout.split('\n')[0]

          if (result !== 'undefined') return result
        },
      },
      {
        name: 'repository',
        message: 'The repository of your project',
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Which package manager do you prefer',
        choices: ['yarn', 'npm'],
        default: 'npm',
        when: config.install || false,
      },
    ])
    .then((answers) => {
      debug(answers)
      run({ answers, config })
    })
}
