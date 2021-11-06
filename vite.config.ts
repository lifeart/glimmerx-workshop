import { defineConfig, PluginOption } from 'vite'
import glimmerXPlugin from 'vite-plugin-glimmerx';

// import { visualizer } from 'rollup-plugin-visualizer';


export default defineConfig({
  plugins: [
    // visualizer(),
    // @ts-expect-error unknown call signature
    glimmerXPlugin() as PluginOption
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 3,
        booleans_as_integers: true,
        drop_console: true,
        drop_debugger: true,
        ecma: 2017,
        module: true,
        unsafe: false,
        unsafe_arrows: true
      },
      mangle: {
        module: true,
        toplevel: true,
      }
    }
  }
});