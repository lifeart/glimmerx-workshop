import { defineConfig, PluginOption } from 'vite'
import glimmerXPlugin from './lib/vite-plugin-glimmerx';

export default defineConfig({
  plugins: [
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
        unsafe: true,
        unsafe_arrows: true
      },
      mangle: {
        module: true,
        toplevel: true,
      }
    }
  }
});