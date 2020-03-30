const inquirer = require('inquirer')
const debug = require('debug')('create-vuepress:query')
const run = require('./run.js')

module.exports = function query(config) {
  debug(config)

  inquirer
    .prompt([
      {
        name: 'template',
        message: 'Template Repository',
        default: 'https://github.com/ludanxer/vuepress-tmp.git',
        validate: (input) => {
          return input.endsWith('.git')
            ? true
            : 'Template Needs to be a Git Repository'
        },
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
        when: config.install,
      },
    ])
    .then((answers) => {
      run({ answers, config })
    })
}
