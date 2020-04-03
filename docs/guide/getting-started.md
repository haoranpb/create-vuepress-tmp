# Getting Started

You'll need **Node.js => 8.6** and **git** installed on your local machine.

Feel free to file a [issue](https://github.com/ludanxer/create-vuepress-tmp/issues/new) if things are not working as expected or the documentation is not clear.

## Scaffolding

::: tip
Currently, `yarn` is the (personally) recommanded package manager. It'll be used for the rest of the documentation, but `npm` should also work.
:::

To quickly scaffold a VuePress documentation site, choose one of the following methods:

### Yarn

```bash
yarn create vuepress-tmp vuepress-starter
```

### npx

```bash
npx create-vuepress-tmp vuepress-starter
```

### npm

```bash
npm init vuepress-tmp vuepress-starter
```

Those commands above will create a directory `vuepress-starter` based on the [template](#template) you choose.

## CLI Option

There are a few options availalbe for the cli. For a normal user, most likely you'll only need `-i/--install` to install dependencies after scaffolding.

```bash
# --install flag will install dependencies after scaffolding
yarn create vuepress-tmp vuepress-starter --install
```

more details are available at: [command line interface](./cli.html)

## Template

Currently, a template needs to be a git repository.

There is a template maintained with `create-vuepress-tmp`: [vuepress-tmp](https://github.com/ludanxer/vuepress-tmp)

It's recommanded to make template a [template repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-template-repository), so users can simply create a repository base on it or develop a new template base on it.
