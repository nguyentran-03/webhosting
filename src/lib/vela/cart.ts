import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PROMO_CODE } from "@/lib/vela/catalog";

export type CartLine = {
  productId: string;
  lens: string;
  qty: number;
};

export type Sheet = { kind: "closed" } | { kind: "frame"; id: string } | { kind: "bag" };

type CartStore = {
  lines: CartLine[];
  promo: string | null;
  hydrated: boolean;
  sheet: Sheet;
  setHydrated: (value: boolean) => void;
  openFrame: (id: string) => void;
  openBag: () => void;
  closeSheet: () => void;
  add: (productId: string, lens: string, qty?: number) => void;
  setQty: (productId: string, lens: string, qty: number) => void;
  remove: (productId: string, lens: string) => void;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  clearLines: () => void;
};

const MAX_QTY = 4;

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      lines: [],
      promo: null,
      hydrated: false,
      sheet: { kind: "closed" },
      setHydrated: (value) => set({ hydrated: value }),
      openFrame: (id) => set({ sheet: { kind: "frame", id } }),
      openBag: () => set({ sheet: { kind: "bag" } }),
      closeSheet: () => set({ sheet: { kind: "closed" } }),
      add: (productId, lens, qty = 1) => {
        const lines = get().lines.slice();
        const index = lines.findIndex((line) => line.productId === productId && line.lens === lens);
        const addQty = Math.max(1, Math.min(MAX_QTY, qty));
        if (index === -1) {
          lines.push({ productId, lens, qty: addQty });
        } else {
          const current = lines[index];
          if (!current) return;
          lines[index] = { ...current, qty: Math.min(MAX_QTY, current.qty + addQty) };
        }
        set({ lines });
      },
      setQty: (productId, lens, qty) => {
        set({
          lines: get()
            .lines.map((line) =>
              line.productId === productId && line.lens === lens
                ? { ...line, qty: Math.max(0, Math.min(MAX_QTY, qty)) }
                : line,
            )
            .filter((line) => line.qty > 0),
        });
      },
      remove: (productId, lens) => {
        set({
          lines: get().lines.filter((line) => !(line.productId === productId && line.lens === lens)),
        });
      },
      applyPromo: (code) => {
        const ok = code.trim().toUpperCase() === PROMO_CODE;
        if (ok) set({ promo: PROMO_CODE });
        return ok;
      },
      clearPromo: () => set({ promo: null }),
      clearLines: () => set({ lines: [] }),
    }),
    {
      name: "vela-cart",
      skipHydration: true,
      partialize: (state) => ({ lines: state.lines, promo: state.promo }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
