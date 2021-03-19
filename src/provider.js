import { configSchema, getConfig } from './config';
import { EventEmitter } from 'events';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import { spawnSync } from 'child_process';
import { which } from './util';

export { configSchema as config };

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
      if (getConfig('alwaysEligible') === true) {
        return true;
      }

      const cmd = spawnSync(which(), ['fpc']);
      if (!cmd?.stdout?.toString()) {
        return false;
      }

      return true;
    }

    settings() {
      const errorMatch = [
        '(?<file>.+)\\((?<line>\\d+)\\,(?<col>\\d+)\\) (?<message>.+)'
      ];

      // User settings
      const customFreePascalArguments = getConfig('customFreePascalArguments').trim().split(' ');

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

// This package depends on build, make sure it's installed
export function activate() {
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies('build-fpc');
  }
}
