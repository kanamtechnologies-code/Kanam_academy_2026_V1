import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kanam Academy",
    short_name: "Kanam",
    description: "Kanam Academy — AI, coding, and digital skills for students.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f3d2a",
    icons: [
      {
        src: "/icon-192.png?v=wordmark",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png?v=wordmark",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png?v=wordmark",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png?v=wordmark",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
