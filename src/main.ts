import { createSSRApp } from "vue";
import App from "./App.vue";
import { createInterceptors } from "@/interceptor";

createInterceptors();
export function createApp() {
  const app = createSSRApp(App);
  return {
    app
  };
}
