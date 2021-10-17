import { transformSync } from "@babel/core";

import babelGlimmerPreset from "@glimmerx/babel-preset";
import tsPreset from "@babel/preset-typescript";
import parseStaticImports from "parse-static-imports";

const templateFileRegex = /\.(hbs)$/;
const scriptFileRegex = /\.(ts|js)$/;
const fixDelimiter = '// [will-be-removed]';

function isNodeModulesPath(str) {
  return str.includes('node_modules');
}

export default function vitePluginGlimmerX(
  plgOptions
) {
  let viteConfig;
  return {
    name: 'vite:glimmerx',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },

    transform(rawCode, id) {
      let code = rawCode;

      if (templateFileRegex.test(id)) {
        code = `
          import { hbs } from '@glimmerx/component';
          export default hbs\`${rawCode.trim()}\`;
        `.trim();
      } else if (!scriptFileRegex.test(id)) {
        return;
      }

      if (!isNodeModulesPath(id)) {
        // https://github.com/typed-ember/glint/issues/223
        code = code.split('@glint/environment-glimmerx/').join('@glimmerx/');
      }

      const needPatch = !isNodeModulesPath(id);

      const imports = parseStaticImports(code).filter(e => {
        return e.moduleName.startsWith('@glint/') ||  e.moduleName.startsWith('@glimmerx/') || !e.moduleName.startsWith("@");
      }).map((el) => [...el.namedImports.map(e => e.alias), el.defaultImport]).reduce((acc, items) => {
        return acc.concat(items);
      }, []).filter((el) => el.length && el !== 'hbs').map(e => e.split(' ').pop().trim())

      // https://github.com/glimmerjs/glimmer.js/issues/365
      code = needPatch ? `
        ${code};
        ${fixDelimiter}
        export const _params = [${imports.map(e => `${e}`).join(',')}];
      ` : code;

      const result = transformSrcCode(code, id, plgOptions, viteConfig);

      return {
        code: needPatch ? result.split(fixDelimiter)[0].trim() : result,
        map: null,
      };

    },
  };
}


function transformSrcCode(code, fileName, plgOptions, viteConfig) {
  let presets = [];
  if (isNodeModulesPath(fileName) || fileName.endsWith('.js')) {
    presets = [function (api, opts) {
      return babelGlimmerPreset(api, {
        ...opts, ...{
          isDebug: !viteConfig.isProduction
        }
      })
    }];
  } else {
    presets = [tsPreset, function (api, opts) {
      return babelGlimmerPreset(api, {
        ...opts, ...{
          isDebug: !viteConfig.isProduction
        }
      })
    }]
  }
  let result = transformSync(code, {
    sourceType: "module",
    babelrc: false,
    configFile: false,
    envName: viteConfig.mode,
    filename: fileName,
    presets
  });
  return result.code;
}