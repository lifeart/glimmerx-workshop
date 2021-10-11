import { transformSync } from "@babel/core";

import babelGlimmerPreset from "@glimmerx/babel-preset";
import tsPreset from "@babel/preset-typescript";

const templateFileRegex = /\.(hbs)$/;

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
      return {
        code: transformSrcCode(code, id, plgOptions, viteConfig),
        map: null,
      };
    },
  };
}


function transformSrcCode(code, fileName, plgOptions, viteConfig) {
    let result = transformSync(code, {
        sourceType: "module",
        babelrc: false,
        configFile: false,
        envName: viteConfig.mode,
        filename: fileName,
        presets: [function(api, opts) {
            return babelGlimmerPreset(api, {...opts, ...{
                isDebug: !viteConfig.isProduction
            }})
        }, tsPreset]
    });
    return result.code;
}