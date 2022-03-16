import { registerSW } from "virtual:pwa-register";
import App from "./App.svelte";

registerSW({
  onNeedRefresh() {
    // TODO
  },
  onOfflineReady() {},
});

const app = new App({
  target: document.getElementById("app"),
});

export default app;
