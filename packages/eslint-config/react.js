import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import pluginReact from 'eslint-plugin-react';
import { config as baseConfig } from './base.js';

export const config = [
  ...baseConfig,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      }
    }
  },
  {
    plugins: {
      'react-hooks': reactHooks
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...reactHooks.configs.recommended.rules
    }
  }
];
