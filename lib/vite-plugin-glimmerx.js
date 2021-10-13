import { transformSync } from "@babel/core";

import babelGlimmerPreset from "@glimmerx/babel-preset";
import tsPreset from "@babel/preset-typescript";
import parseStaticImports from "parse-static-imports";

const templateFileRegex = /\.(hbs)$/;
const fixDelimiter = '// [will-be-removed]';

export default function vitePluginBabelImport(
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
      } else if (!id.endsWith('.ts') && !id.endsWith('.js')) {
        return;
      }

      const needPatch = !id.includes('node_modules');

      const imports = parseStaticImports(code).filter(e => {
        return e.moduleName.startsWith('@glimmerx/') || !e.moduleName.startsWith("@");
      }).map((el) => [...el.namedImports.map(e => e.alias), el.defaultImport]).reduce((acc, items) => {
        return acc.concat(items);
      }, []).filter((el) => el.length && el !== 'hbs');

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
  if (fileName.includes('node_modules') || fileName.endsWith('.js')) {
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