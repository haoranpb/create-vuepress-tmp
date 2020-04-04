---
sidebarDepth: 3
---

# Template

::: tip
A template needs to be a git repository.
:::

Currently, there is one template maintained with `create-vuepress-tmp`: [vuepress-tmp](https://github.com/ludanxer/vuepress-tmp).

## Compile

Templates will be compiled by [lodash.template](https://lodash.com/docs/4.17.15#template) under the hood.

```js
title: '<%= name %>'
```

Check out [Interpolate Data](#interpolate-data) for all the data you can use during compling.

By default, all files (except cofiguration file) will be compiled. However, you can [config](#configuration) which files to be compiled in your own template.

## Interpolate Data

There are a few questions asked every time before scaffolding (powered by [Inquirer](https://github.com/SBoudrias/Inquirer.js)). The answers can be used as interpolate data during template compiling.

```js
const compiled = _.template(content)
compiled({
  template: '',
  name: '',
  description: '',
  author: '',
  mail: '',   // will show if author is not empty
  manager: '' // will show with -i/--install flag
})
```

::: details Default Questions
<<< @/lib/query.js
:::

If those data is not enough for you, you can create your template based questions through [configuration](#configuraiton).

::: warning Note
Those questions will be prompted after `git clone` and before `compile`.

Do not use the same `name` with default questions unless you know what you're doing, or the defaults will be overwrited.
:::

## Configuration

`create-vuepress-tmp` allows template based configuration: A `tmp-setting.json` file at the root of the git repository.

The configuration file is optional, but I suggest you at least put `version` in it.

### version

To specify which version of `create-vuepress-tmp` you create for.

If the versions do not match, a warnning'll be shown.

```json
{
  "version": ">0.2.5",
}
```

### glob

All files in your template repository will be cloned during scaffolding, however, you can specify which files to compile via [glob](https://github.com/isaacs/node-glob).

```js
glob.sync(tmpSetting.glob.pattern, {
  dot: true,
  nodir: true,
  absolute: true,
  ignore: tmpSetting.glob.ignore,
})
```

This can be quite handy when your template has static assets that don't need compiling like images.

```json
{
  "glob": {
    "pattern": "**",
    "ignore": [
      "tmp-setting.json",
      "**/*.png"
    ]
  }
}
```

### question

If the default questions are not enough for you, you can prompt more questions through configuration.

See [Inquirer](https://github.com/SBoudrias/Inquirer.js) for more details about those questions.

```json
{
  "question": [
    {
      "name": "ga",
      "message": "Google analytics tracking id",
      "default": "UA-00000000-0"
    }
  ]
}
```

The answers will also be available during compiling like the default ones.

```js
plugins: [
  [
    '@vuepress/google-analytics',
    {
      'ga': '<%= ga %>'
    }
  ],
]
```
