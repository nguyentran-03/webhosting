import { useEffect, useId, useState, type FormEvent } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ChevronDown,
  Minus,
  Plus,
  Star,
  X,
} from "lucide-react";
import {
  FREE_SHIPPING_CENTS,
  PROMO_CODE,
  craft,
  faqs,
  filters,
  categoryLabel,
  getProduct,
  money,
  pairFor,
  products,
  quote,
  reviews,
  type FilterId,
  type Product,
} from "@/lib/vela/catalog";
import { useCart } from "@/lib/vela/cart";

const tap =
  "transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40 disabled:active:scale-100";

export function ShopPage({ frame }: { frame?: string }) {
  const openFrame = useCart((state) => state.openFrame);
  const openBag = useCart((state) => state.openBag);
  const hydrated = useCart((state) => state.hydrated);
  const lines = useCart((state) => state.lines);
  const promo = useCart((state) => state.promo);
  const summary = quote(hydrated ? lines : [], hydrated ? promo : null);

  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (frame) openFrame(frame);
  }, [frame, openFrame]);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#shop"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-accent focus:px-4 focus:py-3 focus:text-bg"
      >
        Skip tới gọng
      </a>
      <Marquee />
      <Header count={summary.count} onCart={openBag} />
      <main>
        <Hero />
        <Catalog onOpen={openFrame} />
        <Editorial />
        <Craft />
        <CaseBlock />
        <Reviews />
        <Faq />
        <Offer onApplied={openBag} />
      </main>
      <Footer />
      <MobileBar count={summary.count} total={summary.total} onCart={openBag} />
      <Sheet />
    </div>
  );
}

function Marquee() {
  const line = "ĐỢT 01 ĐANG MỞ  ·  KÍNH CHO NẮNG SÀI GÒN  ·  HỘP DA ĐI KÈM  ·  ĐỔI 30 NGÀY  ·  ";
  return (
    <div className="overflow-hidden border-b border-line bg-bg">
      <div className="ticker-track flex w-max py-2">
        <p className="px-2 text-xs tracking-widest text-fg">{line.repeat(4)}</p>
        <p className="px-2 text-xs tracking-widest text-fg" aria-hidden="true">
          {line.repeat(4)}
        </p>
      </div>
    </div>
  );
}

function Header({ count, onCart }: { count: number; onCart: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6">
        <nav className="flex items-center gap-4 text-xs tracking-widest text-fg">
          <a href="#top" className="hover:text-muted">
            TRANG CHỦ
          </a>
          <a href="#shop" className="hover:text-muted">
            GỌNG
          </a>
          <a href="#faq" className="hidden hover:text-muted sm:inline">
            LIÊN HỆ
          </a>
        </nav>
        <a href="#top" className="font-display text-2xl tracking-wide text-fg">
          VELA
        </a>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCart}
            className={`${tap} h-11 px-2 text-xs tracking-widest text-fg`}
            aria-label={count > 0 ? `Mở túi, ${count} gọng` : "Mở túi"}
          >
            TÚI{count > 0 ? ` (${count})` : ""}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top">
      <img
        src="/products/hero.jpg"
        alt="Người đeo kính phi công vàng, đi trên phố Sài Gòn buổi chiều"
        className="hero-photo w-full object-cover"
        fetchPriority="high"
      />
    </section>
  );
}

function Catalog({ onOpen }: { onOpen: (id: string) => void }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const visible = products.filter((product) => filter === "all" || product.category === filter);

  return (
    <section id="shop" className="scroll-mt-14 border-b border-line">
      <div className="grid lg:grid-cols-[18rem_1fr]">
        <div className="flex flex-col justify-between gap-8 px-5 py-8 sm:px-8 lg:py-10">
          <div>
            <h1 className="font-display text-5xl leading-none text-fg sm:text-6xl">
              Đợt 01
              <br />
              đang mở
            </h1>
            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Lọc chất liệu">
              {filters.map((item) => {
                const selected = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFilter(item.id)}
                    className={`${tap} h-11 px-3 text-xs tracking-widest ${
                      selected ? "bg-fg text-bg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-muted">
            Tám gọng. Thử ở Sài Gòn. Giao 2–4 ngày.
          </p>
        </div>
        {visible.length === 0 ? (
          <p className="px-5 py-16 text-sm text-muted">Không có gọng này.</p>
        ) : (
          <ul className="flex gap-3 overflow-x-auto px-5 py-6 sm:pr-6">
            {visible.map((product) => (
              <li key={product.id} className="w-56 shrink-0 sm:w-64">
                <ProductCard product={product} onOpen={onOpen} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: (id: string) => void }) {
  return (
    <button type="button" onClick={() => onOpen(product.id)} className="group block w-full text-left">
      <span className="block h-80 overflow-hidden bg-surface sm:h-96">
        <img
          src={product.image}
          alt={product.alt}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </span>
      <span className="mt-3 block text-xs tracking-widest text-fg uppercase">{product.name}</span>
      <span className="mt-1 block text-xs text-muted tabular-nums">{money(product.price)}</span>
    </button>
  );
}

function Editorial() {
  return (
    <section className="grid border-y border-line lg:grid-cols-2">
      <figure className="relative min-h-96">
        <img
          src="/concepts/cafe.jpg"
          alt="Kính mai rùa trên bàn cà phê đá"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <figcaption className="absolute bottom-0 left-0 bg-bg px-4 py-3 text-xs tracking-widest text-muted uppercase">
          Harbor · bàn cà phê
        </figcaption>
      </figure>
      <div className="flex flex-col bg-surface">
        <img
          src="/concepts/room.jpg"
          alt="Ba gọng trên thanh gỗ, nắng qua cửa chớp"
          className="h-72 w-full object-cover sm:h-96"
        />
        <blockquote className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10">
          <p className="font-display text-3xl leading-tight text-fg sm:text-4xl">“Bốn giờ chiều, hết nheo mắt.”</p>
          <footer className="mt-4 text-sm text-muted">Linh Phạm · Solstice · Quận 3</footer>
        </blockquote>
      </div>
    </section>
  );
}

function Craft() {
  return (
    <section id="craft" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-16 sm:py-24">
      <p className="text-xs font-medium text-accent">Cách làm</p>
      <h2 className="mt-3 max-w-xl font-display text-4xl text-fg sm:text-5xl">Làm cho nắng, không làm cho logo.</h2>
      <ul className="mt-12 grid gap-10 sm:grid-cols-3">
        {craft.map((item, index) => (
          <li key={item.title} className="border-t border-line pt-5">
            <p className="font-display text-3xl text-accent tabular-nums">0{index + 1}</p>
            <h3 className="mt-4 text-lg text-fg">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CaseBlock() {
  return (
    <section className="grid border-y border-line lg:grid-cols-2">
      <img
        src="/products/case.jpg"
        alt="Hộp da cognac, kính phi công vàng nhét một nửa"
        className="h-80 w-full object-cover sm:h-96 lg:h-full"
      />
      <div className="flex flex-col justify-center gap-5 px-5 py-12 sm:px-10 lg:px-14">
        <p className="text-xs font-medium text-accent">Trong thùng</p>
        <h2 className="font-display text-4xl text-fg sm:text-5xl">Hộp da đi cùng gọng.</h2>
        <p className="max-w-md text-base leading-relaxed text-muted">
          Da cognac, một khăn mềm, không logo to. Đợt này gọng nào cũng có — không phải ô tick lúc thanh toán.
        </p>
        <a
          href="#shop"
          className={`${tap} inline-flex h-12 w-fit items-center bg-accent px-6 text-sm font-medium text-bg hover:brightness-110`}
        >
          Chọn gọng
        </a>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-16 sm:py-24">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-accent">Đeo ngoài đường</p>
          <h2 className="mt-3 font-display text-4xl text-fg sm:text-5xl">4.8 từ người giữ lại.</h2>
        </div>
        <p className="text-sm text-muted">Người mua thật · mùa trước và mùa này</p>
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <li key={review.id} className="flex flex-col gap-4 border border-line bg-surface p-5 sm:p-6">
            {"image" in review && review.image ? (
              <img src={review.image} alt="" className="h-24 w-full object-cover" />
            ) : null}
            <Stars value={review.stars} />
            <p className="font-display text-2xl leading-snug text-fg">“{review.quote}”</p>
            <p className="mt-auto text-sm text-muted">
              {review.name} · {review.place}
              <span className="text-fg"> · {review.product}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-xs font-medium text-accent">Trước khi đặt</p>
          <h2 className="mt-3 font-display text-4xl text-fg sm:text-5xl">Vừa mặt, nắng, đổi trả.</h2>
        </div>
        <Accordion.Root type="single" collapsible className="border-t border-line lg:col-span-8">
          {faqs.map((item) => (
            <Accordion.Item key={item.q} value={item.q} className="border-b border-line">
              <Accordion.Header>
                <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-base text-fg">
                  {item.q}
                  <ChevronDown className="size-4 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="pb-5 text-sm leading-relaxed text-muted">{item.a}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}

function Offer({ onApplied }: { onApplied: () => void }) {
  const promo = useCart((state) => state.promo);
  const count = useCart((state) => state.lines.reduce((sum, line) => sum + line.qty, 0));
  const applyPromo = useCart((state) => state.applyPromo);
  const applied = promo === PROMO_CODE;

  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium text-accent">Đợt mở</p>
          <h2 className="mt-3 font-display text-4xl text-fg">Giảm mười phần trăm.</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
            Không cần để lại email. Bấm {PROMO_CODE}, mã nằm trong túi đến lúc thanh toán.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <p className="font-display text-4xl tracking-wide text-fg">{PROMO_CODE}</p>
          <button
            type="button"
            disabled={applied}
            onClick={() => {
              applyPromo(PROMO_CODE);
              if (count > 0) onApplied();
              else document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`${tap} h-12 bg-accent px-5 text-sm font-medium text-bg hover:brightness-110`}
          >
            {applied ? "Đã áp" : "Áp vào túi"}
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line px-5 py-12 pb-28 lg:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-3xl text-fg">VELA</p>
          <p className="mt-2 max-w-sm text-sm text-muted">Kính cho nắng Sài Gòn. Gói tay. Giao 2–4 ngày.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
          <a href="#shop" className="hover:text-fg">
            Gọng
          </a>
          <a href="#craft" className="hover:text-fg">
            Làm kính
          </a>
          <a href="#reviews" className="hover:text-fg">
            Người giữ
          </a>
          <a href="#faq" className="hover:text-fg">
            Đổi trả
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-xs text-muted">© 2026 VELA. Thanh toán thử — chưa trừ tiền.</p>
    </footer>
  );
}

function MobileBar({ count, total, onCart }: { count: number; total: number; onCart: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 p-3 backdrop-blur lg:hidden">
      {count > 0 ? (
        <button
          type="button"
          onClick={onCart}
          className={`${tap} flex h-12 w-full items-center justify-between bg-accent px-4 text-sm font-medium text-bg`}
        >
          <span>Xem túi · {count}</span>
          <span className="tabular-nums">{money(total)}</span>
        </button>
      ) : (
        <a
          href="#shop"
          className={`${tap} flex h-12 w-full items-center justify-center bg-accent text-sm font-medium text-bg`}
        >
          Xem đợt này · từ {money(Math.min(...products.map((product) => product.price)))}
        </a>
      )}
    </div>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5 text-accent" aria-label={`${value} trên 5 sao`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className="size-3.5" fill={index < value ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </span>
  );
}

function Sheet() {
  const sheet = useCart((state) => state.sheet);
  const closeSheet = useCart((state) => state.closeSheet);
  const openBag = useCart((state) => state.openBag);
  const openFrame = useCart((state) => state.openFrame);
  const product = sheet.kind === "frame" ? getProduct(sheet.id) : undefined;
  const bag = sheet.kind === "bag";

  return (
    <Dialog.Root
      open={sheet.kind !== "closed"}
      onOpenChange={(open) => {
        if (!open) closeSheet();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-fg/50" />
        <Dialog.Content
          className={
            bag
              ? "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-bg outline-none"
              : "fixed inset-0 z-50 overflow-y-auto bg-bg outline-none lg:inset-6 lg:border lg:border-line"
          }
        >
          {product ? <ProductBody key={product.id} product={product} onAdded={openBag} onSwitch={openFrame} /> : null}
          {bag ? <CartBody onClose={closeSheet} /> : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ProductBody({
  product,
  onAdded,
  onSwitch,
}: {
  product: Product;
  onAdded: () => void;
  onSwitch: (id: string) => void;
}) {
  const [lens, setLens] = useState(product.lenses[0] ?? "Khói");
  const add = useCart((state) => state.add);
  const related = products.find((item) => item.category === product.category && item.id !== product.id);
  const note = reviews.find((review) => review.product === product.name);

  return (
    <div className="grid min-h-full lg:grid-cols-2">
      <div className="order-2 flex flex-col justify-center px-5 py-10 sm:px-10 lg:order-1 lg:px-14 lg:py-16">
        <p className="text-xs tracking-widest text-muted uppercase">
          {product.family} · {categoryLabel[product.category]}
        </p>
        <Dialog.Title className="mt-3 font-display text-4xl text-fg sm:text-5xl">{product.name}</Dialog.Title>
        <p className="mt-3 text-sm tabular-nums">
          {money(product.price)}
          {product.compareAt ? (
            <span className="ml-3 text-muted line-through">{money(product.compareAt)}</span>
          ) : null}
        </p>
        <Dialog.Description className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          {product.story}
        </Dialog.Description>
        {note ? <p className="mt-4 max-w-md text-sm text-fg">“{note.quote}”</p> : null}
        <Accordion.Root type="single" collapsible className="mt-8 border-t border-line">
          <Accordion.Item value="fit" className="border-b border-line">
            <Accordion.Header>
              <Accordion.Trigger className="group flex h-12 w-full items-center justify-between text-left text-sm text-fg">
                Form
                <Plus className="size-4 text-muted group-data-[state=open]:hidden" />
                <Minus className="hidden size-4 text-muted group-data-[state=open]:block" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="pb-4 text-sm leading-relaxed text-muted">
              {product.material}. {product.weight}. {product.measure}. {product.fit}.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="ship" className="border-b border-line">
            <Accordion.Header>
              <Accordion.Trigger className="group flex h-12 w-full items-center justify-between text-left text-sm text-fg">
                Giao và đổi
                <Plus className="size-4 text-muted group-data-[state=open]:hidden" />
                <Minus className="hidden size-4 text-muted group-data-[state=open]:block" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="pb-4 text-sm leading-relaxed text-muted">
              Giao ngày làm việc kế. Đổi trong 30 ngày. Hộp da có trong thùng.
              {product.stock <= 8 ? ` Còn ${product.stock} cặp.` : ""}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        {related ? (
          <button
            type="button"
            onClick={() => onSwitch(related.id)}
            className="mt-6 w-fit text-left text-xs tracking-widest text-muted uppercase hover:text-fg"
          >
            Tiếp · {related.name}
          </button>
        ) : null}
      </div>
      <div className="relative order-1 min-h-96 bg-surface lg:order-2 lg:min-h-screen">
        <img src={product.image} alt={product.alt} className="absolute inset-0 h-full w-full object-cover" />
        <Dialog.Close
          className={`${tap} absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center bg-bg text-fg`}
          aria-label="Đóng gọng"
        >
          <X className="size-4" />
        </Dialog.Close>
        <div className="absolute right-4 bottom-4 left-4 flex flex-col items-end gap-3 sm:left-auto">
          <div className="flex flex-wrap justify-end gap-2" role="group" aria-label="Tròng">
            {product.lenses.map((option) => {
              const selected = option === lens;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setLens(option)}
                  className={`${tap} h-11 px-3 text-xs tracking-widest ${
                    selected ? "bg-fg text-bg" : "bg-bg text-fg"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className={`${tap} h-11 bg-fg px-4 text-xs tracking-widest text-bg`}
            onClick={() => {
              add(product.id, lens, 1);
              window.setTimeout(() => onAdded(), 80);
            }}
          >
            CHO VÀO TÚI — {money(product.price)}
          </button>
        </div>
      </div>
    </div>
  );
}

type PlacedOrder = {
  id: string;
  name: string;
  email: string;
  city: string;
  lines: { name: string; lens: string; qty: number; total: number }[];
  total: number;
};

function CartBody({ onClose }: { onClose: () => void }) {
  const lines = useCart((state) => state.lines);
  const promo = useCart((state) => state.promo);
  const hydrated = useCart((state) => state.hydrated);
  const setQty = useCart((state) => state.setQty);
  const remove = useCart((state) => state.remove);
  const applyPromo = useCart((state) => state.applyPromo);
  const clearPromo = useCart((state) => state.clearPromo);
  const clearLines = useCart((state) => state.clearLines);
  const add = useCart((state) => state.add);
  const summary = quote(hydrated ? lines : [], hydrated ? promo : null);
  const extra = pairFor(summary.detailed.map((line) => line.product.id));
  const [step, setStep] = useState<"bag" | "details" | "done">("bag");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const progress = Math.min(100, (summary.subtotal / FREE_SHIPPING_CENTS) * 100);

  return (
    <>
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <Dialog.Title className="font-display text-3xl text-fg">
          {step === "done" ? "Xong" : step === "details" ? "Thanh toán" : "Túi"}
        </Dialog.Title>
        <Dialog.Close
          className={`${tap} inline-flex h-11 w-11 items-center justify-center border border-line text-fg`}
          aria-label="Đóng túi"
        >
          <X className="size-4" />
        </Dialog.Close>
      </div>
      <Dialog.Description className="sr-only">
        {summary.count} gọng. Tổng {money(summary.total)}.
      </Dialog.Description>

      {step === "bag" ? (
        <>
          <div className="border-b border-line px-5 py-4">
            <div className="h-1 bg-line">
              <div className="ship-bar h-full bg-accent" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-sm text-muted">
              {summary.subtotal === 0
                ? `Freeship từ ${money(FREE_SHIPPING_CENTS)}.`
                : summary.untilFree === 0
                  ? "Đã được freeship."
                  : `Còn ${money(summary.untilFree)} nữa là freeship.`}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {summary.detailed.length === 0 ? (
              <div className="flex h-full flex-col justify-center gap-4">
                <p className="font-display text-3xl text-fg">Túi đang trống.</p>
                <p className="text-sm text-muted">Solstice là gọng nhiều người lấy trước.</p>
                <a
                  href="#shop"
                  onClick={onClose}
                  className={`${tap} inline-flex h-12 w-fit items-center bg-accent px-5 text-sm font-medium text-bg`}
                >
                  Xem gọng
                </a>
              </div>
            ) : (
              <ul className="flex flex-col gap-5">
                {summary.detailed.map((line) => (
                  <li key={`${line.product.id}-${line.lens}`} className="grid grid-cols-[5rem_1fr] gap-3">
                    <img src={line.product.image} alt="" className="h-20 w-20 object-cover" />
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-display text-xl text-fg">{line.product.name}</p>
                        <p className="text-sm tabular-nums">{money(line.lineTotal)}</p>
                      </div>
                      <p className="text-xs tracking-wide text-muted uppercase">{line.lens}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border border-line">
                          <button
                            type="button"
                            aria-label={`Bớt ${line.product.name}`}
                            className={`${tap} h-11 w-11`}
                            onClick={() => setQty(line.product.id, line.lens, line.qty - 1)}
                          >
                            <Minus className="mx-auto size-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm tabular-nums">{line.qty}</span>
                          <button
                            type="button"
                            aria-label={`Thêm ${line.product.name}`}
                            className={`${tap} h-11 w-11`}
                            onClick={() => setQty(line.product.id, line.lens, line.qty + 1)}
                          >
                            <Plus className="mx-auto size-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="h-11 px-2 text-xs tracking-wide text-muted uppercase hover:text-fg"
                          onClick={() => remove(line.product.id, line.lens)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {extra ? (
              <div className="mt-6 flex items-center gap-3 border border-line p-3">
                <img src={extra.image} alt="" className="h-16 w-16 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs tracking-widest text-muted uppercase">Hay đi cùng</p>
                  <p className="font-display text-xl text-fg">{extra.name}</p>
                  <p className="text-sm tabular-nums">{money(extra.price)}</p>
                </div>
                <button
                  type="button"
                  className={`${tap} h-11 shrink-0 border border-line px-3 text-sm text-fg`}
                  onClick={() => add(extra.id, extra.lenses[0] ?? "Khói", 1)}
                >
                  Thêm
                </button>
              </div>
            ) : null}
          </div>
          <div className="border-t border-line px-5 py-4 pb-6">
            <PromoRow
              code={code}
              error={codeError}
              applied={promo === PROMO_CODE}
              onCode={setCode}
              onApply={() => {
                const ok = applyPromo(code);
                setCodeError(ok ? "" : "Mã này không dùng được.");
                if (ok) setCode("");
              }}
              onClear={() => {
                clearPromo();
                setCodeError("");
              }}
            />
            <Totals summary={summary} />
            <button
              type="button"
              disabled={summary.count === 0}
              onClick={() => setStep("details")}
              className={`${tap} mt-4 h-12 w-full bg-accent text-sm font-medium text-bg hover:brightness-110`}
            >
              Thanh toán
            </button>
            <p className="mt-2 text-center text-xs text-muted">Thanh toán thử · chưa trừ tiền</p>
          </div>
        </>
      ) : null}

      {step === "details" ? (
        <CheckoutForm
          summary={summary}
          onBack={() => setStep("bag")}
          onPlace={(draft) => {
            const id = `VELA-${Math.floor(1000 + Math.random() * 9000)}`;
            setOrder({
              id,
              ...draft,
              lines: summary.detailed.map((line) => ({
                name: line.product.name,
                lens: line.lens,
                qty: line.qty,
                total: line.lineTotal,
              })),
              total: summary.total,
            });
            clearLines();
            setStep("done");
          }}
        />
      ) : null}

      {step === "done" && order ? (
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-6">
          <p className="text-xs tracking-widest text-accent uppercase">{order.id}</p>
          <p className="font-display text-4xl text-fg">Mình giữ lại cho {order.name.split(" ")[0]}.</p>
          <p className="text-sm leading-relaxed text-muted">
            Xác nhận sẽ gửi tới {order.email}. Giao về {order.city}. Chưa trừ tiền — đây là thanh toán thử.
          </p>
          <ul className="border-t border-line">
            {order.lines.map((line) => (
              <li
                key={`${line.name}-${line.lens}`}
                className="flex justify-between gap-3 border-b border-line py-3 text-sm"
              >
                <span>
                  {line.name} · {line.lens} · {line.qty}
                </span>
                <span className="tabular-nums">{money(line.total)}</span>
              </li>
            ))}
          </ul>
          <p className="flex justify-between text-sm">
            <span>Tổng</span>
            <span className="tabular-nums">{money(order.total)}</span>
          </p>
          <button type="button" onClick={onClose} className={`${tap} h-12 bg-accent text-sm font-medium text-bg`}>
            Xem tiếp
          </button>
        </div>
      ) : null}
    </>
  );
}

function PromoRow({
  code,
  error,
  applied,
  onCode,
  onApply,
  onClear,
}: {
  code: string;
  error: string;
  applied: boolean;
  onCode: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  if (applied) {
    return (
      <p className="mb-3 flex items-center justify-between text-sm">
        <span className="text-fg">{PROMO_CODE} đã áp · giảm 10%</span>
        <button type="button" onClick={onClear} className="h-11 px-2 text-xs tracking-wide text-muted uppercase">
          Xóa
        </button>
      </p>
    );
  }
  return (
    <form
      className="mb-3"
      onSubmit={(event) => {
        event.preventDefault();
        onApply();
      }}
    >
      <div className="flex gap-2">
        <label className="sr-only" htmlFor="promo-code">
          Mã giảm giá
        </label>
        <input
          id="promo-code"
          value={code}
          onChange={(event) => onCode(event.target.value)}
          placeholder="Mã"
          autoComplete="off"
          className="h-12 flex-1 border border-line bg-surface px-3 text-sm text-fg outline-none placeholder:text-muted focus:border-accent"
        />
        <button type="submit" className={`${tap} h-12 border border-line px-4 text-sm text-fg hover:border-muted`}>
          Áp dụng
        </button>
      </div>
      {error ? <p className="mt-2 text-sm text-fg">{error}</p> : null}
    </form>
  );
}

function Totals({ summary }: { summary: ReturnType<typeof quote> }) {
  return (
    <dl className="flex flex-col gap-1 text-sm">
      <div className="flex justify-between text-muted">
        <dt>Tạm tính</dt>
        <dd className="tabular-nums text-fg">{money(summary.subtotal)}</dd>
      </div>
      {summary.discount > 0 ? (
        <div className="flex justify-between text-muted">
          <dt>{PROMO_CODE}</dt>
          <dd className="tabular-nums text-fg">−{money(summary.discount)}</dd>
        </div>
      ) : null}
      <div className="flex justify-between text-muted">
        <dt>Ship</dt>
        <dd className="tabular-nums text-fg">{summary.shipping === 0 ? "Freeship" : money(summary.shipping)}</dd>
      </div>
      <div className="mt-2 flex justify-between text-base text-fg">
        <dt>Tổng</dt>
        <dd className="tabular-nums">{money(summary.total)}</dd>
      </div>
    </dl>
  );
}

function CheckoutForm({
  summary,
  onBack,
  onPlace,
}: {
  summary: ReturnType<typeof quote>;
  onBack: () => void;
  onPlace: (draft: { name: string; email: string; city: string }) => void;
}) {
  const nameId = useId();
  const emailId = useId();
  const cityId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Ghi tên để in lên phiếu.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Email này không dùng được.");
      return;
    }
    if (city.trim().length < 2) {
      setError("Thêm thành phố để biết giao về đâu.");
      return;
    }
    setError("");
    onPlace({ name: name.trim(), email: email.trim(), city: city.trim() });
  }

  return (
    <form onSubmit={submit} className="flex flex-1 flex-col overflow-y-auto px-5 py-5" noValidate>
      <button type="button" onClick={onBack} className="mb-4 h-11 w-fit text-sm text-muted hover:text-fg">
        Quay lại túi
      </button>
      <div className="flex flex-col gap-3">
        <Field id={nameId} label="Họ tên" value={name} onChange={setName} autoComplete="name" />
        <Field id={emailId} label="Email" value={email} onChange={setEmail} autoComplete="email" type="email" />
        <Field id={cityId} label="Thành phố" value={city} onChange={setCity} autoComplete="address-level2" />
      </div>
      {error ? <p className="mt-3 text-sm text-fg">{error}</p> : null}
      <div className="mt-6 border-t border-line pt-4">
        <Totals summary={summary} />
      </div>
      <button
        type="submit"
        className={`${tap} mt-4 h-12 w-full bg-accent text-sm font-medium text-bg hover:brightness-110`}
      >
        Đặt hàng · {money(summary.total)}
      </button>
      <p className="mt-2 text-center text-xs text-muted">Chỉ là bản thử. Không thẻ, không trừ tiền.</p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  autoComplete,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs tracking-widest text-muted uppercase">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full border border-line bg-surface px-3 text-sm text-fg outline-none focus:border-accent"
      />
    </div>
  );
}
