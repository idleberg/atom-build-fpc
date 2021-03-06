import { name } from '../package.json';

export const configSchema = {
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

export function getConfig(key) {
  return atom.config.get(`${name}.${key}`);
}
