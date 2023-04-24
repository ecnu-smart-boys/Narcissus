/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 环境变量声明
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_BASIC_URL: string;
  readonly VITE_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
