import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    icon: './src/assets/icon',
    name: 'Pronutrir_Atendimento',
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      setupIcon: './src/assets/icon/IconApp.ico',
      name: 'Pronutrir_Atendimento',
    }),
    new MakerZIP({
      
    },['darwin']),
    new MakerRpm({}),
    new MakerDeb({})
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: "connect-src 'self' * 'unsafe-eval'",
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
  ],
  publishers : [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'github.com/WilliameCorreia',
          name: 'react_electron_atendimento',
        },
        prerelease: false,
        draft: true,
      },
    },
  ]
};

export default config;
