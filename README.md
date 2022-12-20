# IMPORTANT NOTICES

This repository is no longer maintained.

use `choco export` command, to get package list as config.xml format.

```shell
> choco export --include-version-numbers --output-file-path=choco.config
```

# choco-export-config

Exports [Chocolatey](https://chocolatey.org/) package list as config.xml format.

## requirements

- Chocolatey (choco command)
- Node.js
- npm

Naturally, target platform of this tool is only Windows.

## installation

```shell
> npm install --global @togashi/choco-export-config
```

## usage

package list is output to stdout.

```shell
> choco-export-config > choco.config
```

install all packages from `choco.config`.

```shell
> choco install choco.config
```
