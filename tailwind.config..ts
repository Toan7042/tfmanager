import type { Config } from 'tailwindcss';
import flyonui from 'flyonui';
import flyonuiPlugin from 'flyonui/plugin';

const config: Config = {
  content: ['./node_modules/flyonui/dist/js/*.js'],
  plugins: [flyonui, flyonuiPlugin],
};

export default config;
