const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

const mainBaseConfig = require('../common/webpackMainBase.js');
const renderBaseConfig = require('../common/webpackRenderBase.js');
const { MAIN_PROCESS_ENTRY } = require('../common/utils');
const cwdDir = process.cwd();

const dev = {
  server: null,
  serverPort: 1600,
  electronProcess: null,
  injectEnvScript() {
    const env = require('./env.js');
    env.WEB_PORT = this.serverPort;
    env.RES_DIR = path.join(cwdDir, 'resource/release');
    let script = '';
    for (let v in env) {
      script += `process.env.${v}="${env[v]}";`;
    }
    const outFile = path.join(cwdDir, `release/bundled/${MAIN_PROCESS_ENTRY}`);
    const js = `${script}${fs.readFileSync(outFile)}`;
    fs.writeFileSync(outFile, js);
  },
  buildMain() {
    const config = merge(mainBaseConfig, {
      mode: 'development',
      entry: path.join(cwdDir, './src/main/app.ts'),
      output: {
        filename: MAIN_PROCESS_ENTRY,
        path: path.join(cwdDir, 'release/bundled'),
      },
      plugins: [new CleanWebpackPlugin()],
    });

    return new Promise((resolve, reject) => {
      webpack(config).run((err, stats) => {
        if (err) {
          reject(err);
          return;
        }

        if (stats.hasErrors()) {
          reject(stats.toString());
          return;
        }

        this.injectEnvScript();
        resolve();
      });
    });
  },
  getRendererObj() {
    const result = {
      entry: {},
      plugins: [],
    };

    const rendererPath = path.join(cwdDir, 'src/renderer/pages');
    const rendererFiles = fs.readdirSync(rendererPath);

    for (const fileName of rendererFiles) {
      if (!fileName.endsWith('.html')) continue;

      const plainName = path.basename(fileName, '.html');
      if (plainName === 'index') {
        result.entry[plainName] = `/src/renderer/pages/index.tsx`;
      } else {
        result.entry[plainName] = `/src/renderer/pages/${plainName}/index.tsx`;
      }

      result.plugins.push(
        new HtmlWebpackPlugin({
          chunks: [plainName],
          template: path.join(cwdDir, `/src/renderer/pages/${plainName}.html`),
          filename: path.join(cwdDir, `/release/bundled/${plainName}.html`),
          minify: true,
        })
      );
    }

    return result;
  },
  createElectronProcess() {
    this.electronProcess = spawn(
      require('electron').toString(),
      [path.join(cwdDir, `release/bundled/${MAIN_PROCESS_ENTRY}`)],
      {
        cwd: cwdDir,
      }
    );

    this.electronProcess.on('close', () => {
      this.server.close();
      process.exit();
    });

    this.electronProcess.stdout.on('data', (data) => {
      data = data.toString();
      console.log(data);
    });
  },
  startServer() {
    const rendererObj = this.getRendererObj();
    const config = merge(renderBaseConfig, {
      entry: rendererObj.entry,
      output: {
        filename: '[name].[chunkhash:8].js',
        path: path.join(cwdDir, 'release/bundled'),
      },
      mode: 'development',
      plugins: rendererObj.plugins,
    });

    const devServerConfig = {
      static: path.join(cwdDir, 'release/bundled'),
      port: this.serverPort,
    };
    const compiler = webpack(config);
    this.server = new WebpackDevServer(devServerConfig, compiler);
    this.server.start().then(() => {
      this.createElectronProcess();
    });
  },
  async start() {
    try {
      await this.buildMain();
      this.startServer();
    } catch (err) {
      console.error(err);
    }
  },
};

dev.start();
