import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run account:serve:development',
        production: 'nx run account:serve:production',
      },
      ciWebServerCommand: 'nx run account:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
