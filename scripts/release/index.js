const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
// require('dotenv').config();
const webpackRendererProdConfig = require('../common/webpack.config.renderer.prod');
const mainProdConfig = require('../common/webpack.config.main.prod');
const { MAIN_PROCESS_ENTRY } = require('../common/utils');

const cwdDir = process.cwd();

const args = process.argv.slice(2);
const isPack = args.includes('--dir');

const release = {
  injectEnvScript() {
    const env = require('./env.js');
    let script = '';

    for (let v in env) {
      script += `process.env.${v}="${env[v]}";`;
    }

    script += `process.env.RES_DIR = process.resourcesPath;`;
    const outFile = path.join(process.cwd(), `release/bundled/${MAIN_PROCESS_ENTRY}`);
    const js = `${script}${fs.readFileSync(outFile)}`;

    fs.writeFileSync(outFile, js);
  },

  buildMain() {
    return new Promise((resolve, reject) => {
      webpack(mainProdConfig).run((err, stats) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        if (stats.hasErrors()) {
          reject(stats);
          return;
        }

        this.injectEnvScript();
        resolve();
      });
    });
  },

  buildRenderer() {
    return new Promise((resolve, reject) => {
      webpack(webpackRendererProdConfig).run((err, stats) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        if (stats.hasErrors()) {
          reject(stats);
          return;
        }
        resolve();
      });
    });
  },

  buildInstaller() {
    const builder = require('electron-builder');

    const options = {
      config: {
        directories: {
          output: path.join(cwdDir, 'release'),
          app: path.join(cwdDir, 'release/bundled'),
        },
        files: ['**'],
        extends: null,
        productName: 'Dolphin',
        appId: 'site.fujia.app', // the property is important, replace with you own appId
        copyright: 'Copyright © 2022 ${author}',
        asar: true,
        extraResources: require('../common/extraResources'),
        win: require('../common/winConfig'),
        nsis: require('../common/nsisConfig'),
        mac: require('../common/macConfig'),
        dmg: require('../common/dmgConfig'),
        linux: require('../common/linuxConfig'),
      },
      project: cwdDir,
      publish: {
        provider: 'github',
        repo: 'https://github.com/fujia-products/dolphin',
        releaseType: 'release',
        // token: process.env.GH_TOKEN,
      },
      publish: 'always',
    };

    if (isPack) {
      options.dir = true;
    }

    builder.build(options);
  },

  buildModule() {
    const pkgJsonPath = path.join(cwdDir, 'package.json');
    const localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    let electronConfig = localPkgJson.devDependencies.electron.replace('^', '');
    delete localPkgJson.scripts;
    delete localPkgJson.devDependencies;

    localPkgJson.main = MAIN_PROCESS_ENTRY;
    localPkgJson.devDependencies = {
      electron: electronConfig,
    };

    fs.writeFileSync(path.join(cwdDir, 'release/bundled/package.json'), JSON.stringify(localPkgJson));
    fs.mkdirSync(path.join(cwdDir, 'release/bundled/node_modules'));
  },

  async start() {
    await this.buildMain();
    await this.buildRenderer();
    this.buildModule();
    this.buildInstaller();
  },
};

release.start();
