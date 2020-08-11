# build-fpc

[![apm](https://img.shields.io/apm/l/build-fpc.svg?style=flat-square)](https://atom.io/packages/build-fpc)
[![apm](https://img.shields.io/apm/v/build-fpc.svg?style=flat-square)](https://atom.io/packages/build-fpc)
[![apm](https://img.shields.io/apm/dm/build-fpc.svg?style=flat-square)](https://atom.io/packages/build-fpc)
[![Travis](https://img.shields.io/travis/idleberg/atom-build-fpc.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-build-fpc)
[![David](https://img.shields.io/david/idleberg/atom-build-fpc.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-fpc)
[![David](https://img.shields.io/david/dev/idleberg/atom-build-fpc.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-fpc?type=dev)

[Atom Build](https://atombuild.github.io/) provider for `fpc`, compiles Pascal and Object Pascal.

## Installation

### apm

Install `build-fpc` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-fpc`

### Using Git

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Linux & macOS
$ cd ~/.atom/packages/
```

Clone repository as `build-fpc`:

```bash
$ git clone https://github.com/idleberg/atom-build-fpc build-fpc
```

Inside the cloned directory, install Node dependencies:

```bash
$ yarn || npm install
```

## Usage

### Prerequisites

Make sure [Free Pascal](https://www.freepascal.org/) is installed properly and that `fpc` is in your PATH [environmental variable](http://superuser.com/a/284351/195953).

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

* `Free Pascal` - transpile current file
* `Free Pascal [user]` - transpile with custom arguments

### Shortcuts

Here's a reminder of the default shortcuts you can use with this package:

**Select active target**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> or <kbd>F7</kbd>

**Build script**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or <kbd>F9</kbd>

**Jump to error**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>G</kbd> or <kbd>F4</kbd>

**Toggle build panel**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> or <kbd>F8</kbd>

## License

This work is licensed under the [The MIT License](LICENSE.md).
