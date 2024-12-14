import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Dynamically generate aliases for all top-level folders in `src`
// eslint-disable-next-line no-undef
const srcPath = path.resolve(__dirname, './src');
const generateAliases = () => {
  const folders = fs.readdirSync(srcPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({
      name: `@${dirent.name}`,
      path: path.resolve(srcPath, dirent.name),
    }));
  return folders.reduce((aliases, folder) => {
    aliases[folder.name] = folder.path;
    return aliases;
  }, {});
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...generateAliases(),
    },
  },
  // server: {
  //   port: 3000,
  //   open: true,
  // },
});
