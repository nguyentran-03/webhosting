import { createFileRoute } from "@tanstack/react-router";
import { ShopPage } from "@/components/vela/shop-page";
import { getProduct } from "@/lib/vela/catalog";

type Search = { frame?: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const frame = typeof search.frame === "string" ? search.frame : undefined;
    return { frame: frame && getProduct(frame) ? frame : undefined };
  },
  component: Home,
  head: () => ({
    meta: [
      { title: "VELA — Nắng phố." },
      {
        name: "description",
        content: "Kính VELA cho nắng Sài Gòn. Phân cực, hộp da đi kèm, đổi trong 30 ngày.",
      },
    ],
    links: [{ rel: "preload", as: "image", href: "/products/hero.jpg" }],
  }),
});

function Home() {
  const { frame } = Route.useSearch();
  return <ShopPage frame={frame} />;
}
