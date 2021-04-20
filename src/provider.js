import { configSchema, getConfig } from './config';
import { EventEmitter } from 'events';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import Logger from './log';
import meta from '../package.json';
import which from 'which';

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
        Logger.log('Always eligible');
        return true;
      }

      if (which.sync('fpc', { nothrow: true })) {
        Logger.log('Build provider is eligible');
        return true;
      }

      Logger.error('Build provider isn\'t eligible');
      return false;
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

export function activate() {
  Logger.log('Activating package');

  // This package depends on build, make sure it's installed
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies(meta.name);
  }
}

export function deactivate() {
  Logger.log('Deactivating package');
}
