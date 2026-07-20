import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kanam Academy",
    short_name: "Kanam",
    description: "Kanam Academy — AI, coding, and digital skills for students.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#18a16d",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
