import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "favicon-16x16.png",
        "favicon-32x32.png",
        "apple-touch-icon.png",
        "mstile-70x70.png",
        "mstile-144x144.png",
        "mstile-150x150.png",
        "mstile-310x150.png",
        "mstile-310x310.png",
        "robots.txt",
        "safari-pinned-tab.svg",
      ],
      manifest: {
        name: "Eternal Wordle",
        short_name: "Eternal Wordle",
        description: "Yet another Wordle clone.",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        theme_color: "#FFFFFF",
        background_color: "#222233",
      },
    }),
  ],
});
