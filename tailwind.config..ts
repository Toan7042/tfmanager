// tailwind.config.ts
/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
  content: [
    './node_modules/flyonui/dist/js/*.js',
  ],
  plugins: [
    require('flyonui'),
    require('flyonui/plugin'),
  ],
};