'use babel';

import { EventEmitter } from 'events';
import { platform} from 'os';
import { spawnSync } from 'child_process';

// Package settings
import meta from '../package.json';

export const config = {
  customFreePascalArguments: {
    title: 'Custom Free Pascal Arguments',
    description: 'Specify your preferred arguments for `fpc`, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders',
    type: 'string',
    default: '{FILE_ACTIVE}',
    order: 0
  },
  manageDependencies: {
    title: 'Manage Dependencies',
    description: 'When enabled, third-party dependencies will be installed automatically',
    type: 'boolean',
    default: true,
    order: 1
  },
  alwaysEligible: {
    title: 'Always Eligible',
    description: 'The build provider will be available in your project, even when not eligible',
    type: 'boolean',
    default: false,
    order: 2
  }
};

// This package depends on build, make sure it's installed
export function activate() {
  if (atom.config.get(meta.name + '.manageDependencies') === true) {
    this.satisfyDependencies();
  }
}

export function which() {
  if (platform() === 'win32') {
    return 'where';
  }
  return 'which';
}

export function satisfyDependencies() {
  let k;
  let v;

  require('atom-package-deps').install(meta.name);

  const ref = meta['package-deps'];
  const results = [];

  for (k in ref) {
    if (typeof ref !== 'undefined' && ref !== null) {
      v = ref[k];
      if (atom.packages.isPackageDisabled(v)) {
        if (atom.inDevMode()) {
          console.log('Enabling package \'' + v + '\'');
        }
        results.push(atom.packages.enablePackage(v));
      } else {
        results.push(void 0);
      }
    }
  }
  return results;
}

export function provideBuilder() {
  return class FreePascalProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe('build-fpc.customFreePascalArguments', () => this.emit('refresh'));
    }

    getNiceName() {
      return 'Free Pascal';
    }

    isEligible() {
      if (atom.config.get(meta.name + '.alwaysEligible') === true) {
        return true;
      }

      const cmd = spawnSync(which(), ['fpc']);
      if (!cmd.stdout.toString()) {
        return false;
      }

      return true;
    }

    settings() {
      const errorMatch = [
        '(?<file>.+)\\((?<line>\\d+)\\,(?<col>\\d+)\\) (?<message>.+)'
      ];

      // User settings
      const customFreePascalArguments = atom.config.get(meta.name + '.customFreePascalArguments').trim().split(' ');

      return [
        {
          name: 'Free Pascal',
          exec: 'fpc',
          args: [ '{FILE_ACTIVE}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'free-pascal:compile',
          errorMatch: errorMatch
        },
        {
          name: 'Free Pascal (custom)',
          exec: 'fpc',
          args: customFreePascalArguments,
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'free-pascal:compile-with-custom-arguments',
          errorMatch: errorMatch
        }
      ];
    }
  };
}
