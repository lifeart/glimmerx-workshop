import { transformSync } from "@babel/core";

import babelGlimmerPreset from "@glimmerx/babel-preset";

export default function vitePluginBabelImport(
  plgOptions
) {
  let viteConfig;
  return {
    name: 'vite:glimmerx',
    enforce: 'post',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    transform(code, id) {
        if (!id.endsWith('.ts') && !id.endsWith('.js')) {
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
        }]
    });
    return result.code;
}