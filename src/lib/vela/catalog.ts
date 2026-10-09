export type Category = "metal" | "acetate" | "sport";
export type Use = "city" | "drive" | "coast" | "narrow";

export type Badge = "Hay giữ" | "Mới";

export type Product = {
  id: string;
  name: string;
  family: string;
  category: Category;
  uses: Use[];
  price: number;
  compareAt?: number;
  image: string;
  alt: string;
  lenses: string[];
  material: string;
  weight: string;
  measure: string;
  fit: string;
  story: string;
  badge?: Badge;
  stock: number;
  rating: number;
  reviews: number;
};

export const FREE_SHIPPING_CENTS = 1500000;
export const SHIPPING_CENTS = 30000;
export const PROMO_CODE = "VELA10";
export const PROMO_RATE = 0.1;

export const products: Product[] = [
  {
    id: "solstice",
    name: "Solstice",
    family: "Phi công",
    category: "metal",
    uses: ["city", "drive"],
    price: 1690000,
    image: "/products/solstice.jpg",
    alt: "Kính phi công vàng, tròng nâu, trên nền đá",
    lenses: ["Nâu loang", "Xám", "Xanh lá"],
    material: "Thép màu vàng",
    weight: "18 g",
    measure: "58 □ 14 · 140",
    fit: "Vừa · hợp phần lớn",
    story:
      "Cầu kép mỏng, tròng giọt nước ngồi đúng trên mũi. Kính khoáng, phân cực nằm trong tròng, không phải lớp phim dán.",
    badge: "Hay giữ",
    stock: 40,
    rating: 4.9,
    reviews: 842,
  },
  {
    id: "harbor",
    name: "Harbor",
    family: "Vuông",
    category: "acetate",
    uses: ["coast", "city"],
    price: 1490000,
    image: "/products/harbor.jpg",
    alt: "Kính vuông mai rùa, tròng khói",
    lenses: ["Khói", "Nâu", "Xanh lá"],
    material: "Acetate mai rùa",
    weight: "24 g",
    measure: "52 □ 20 · 145",
    fit: "Vừa · chân mày rõ",
    story: "Dày chỗ cần dày, nhẹ trên mũi. Acetate đánh tay, vân không phải decal.",
    stock: 32,
    rating: 4.8,
    reviews: 410,
  },
  {
    id: "mira",
    name: "Mira",
    family: "Mắt mèo",
    category: "acetate",
    uses: ["city"],
    price: 1790000,
    image: "/products/mira.jpg",
    alt: "Kính mắt mèo màu champagne, tròng mật ong",
    lenses: ["Mật ong", "Nâu", "Khói"],
    material: "Acetate champagne",
    weight: "22 g",
    measure: "54 □ 16 · 145",
    fit: "Vừa · đuôi mắt nhấc",
    story: "Mắt mèo nhỏ. Tròng mật ong làm da ấm, không biến buổi chiều thành màu cam.",
    stock: 18,
    rating: 4.9,
    reviews: 226,
  },
  {
    id: "drift",
    name: "Drift",
    family: "Ôm",
    category: "sport",
    uses: ["coast", "drive"],
    price: 1590000,
    image: "/products/drift.jpg",
    alt: "Kính ôm đen mờ, tròng gương bạc",
    lenses: ["Gương bạc", "Khói", "Gương xanh"],
    material: "Nylon mờ",
    weight: "21 g",
    measure: "66 □ 12 · 125",
    fit: "Rộng · ngồi chắc",
    story: "Gọng ôm, không mờ mép. Gương vẫn đọc được menu khi bước vào quán.",
    stock: 24,
    rating: 4.7,
    reviews: 188,
  },
  {
    id: "lumen",
    name: "Lumen",
    family: "Tròn",
    category: "metal",
    uses: ["narrow", "city"],
    price: 1290000,
    image: "/products/lumen.jpg",
    alt: "Kính tròn dây bạc, tròng xanh lá",
    lenses: ["Xanh lá", "Nâu", "Xám"],
    material: "Dây bạc",
    weight: "16 g",
    measure: "48 □ 21 · 145",
    fit: "Hẹp đến vừa",
    story: "Cặp nhẹ nhất. Tròng xanh lá giữ màu cây, cắt chói trên đường.",
    stock: 21,
    rating: 4.8,
    reviews: 301,
  },
  {
    id: "atlas",
    name: "Atlas",
    family: "Chữ nhật",
    category: "metal",
    uses: ["drive"],
    price: 1890000,
    image: "/products/atlas.jpg",
    alt: "Kính navigator thép đen, tròng xám",
    lenses: ["Xám", "Xanh lá", "Nâu loang"],
    material: "Thép đen",
    weight: "20 g",
    measure: "55 □ 18 · 145",
    fit: "Vừa đến rộng",
    story: "Chân mày thẳng, tròng phẳng. Cho đường dài và nắng giữa trưa.",
    badge: "Mới",
    stock: 8,
    rating: 4.8,
    reviews: 64,
  },
  {
    id: "cove",
    name: "Cove",
    family: "To",
    category: "acetate",
    uses: ["coast"],
    price: 1890000,
    image: "/products/cove.jpg",
    alt: "Kính to acetate ngà, tròng hổ phách",
    lenses: ["Hổ phách", "Nâu", "Khói"],
    material: "Acetate ngà",
    weight: "26 g",
    measure: "56 □ 17 · 150",
    fit: "Rộng · che gò má",
    story: "To cố ý. Tròng hổ phách dịu tường trắng, mặt nước, và bê tông giữa trưa.",
    stock: 15,
    rating: 4.8,
    reviews: 97,
  },
  {
    id: "rio",
    name: "Rio",
    family: "Chữ nhật",
    category: "acetate",
    uses: ["city"],
    price: 1390000,
    compareAt: 1690000,
    image: "/products/rio.jpg",
    alt: "Kính chữ nhật acetate ô-liu, tròng nâu",
    lenses: ["Nâu", "Khói", "Xanh lá"],
    material: "Acetate ô-liu",
    weight: "23 g",
    measure: "53 □ 18 · 145",
    fit: "Vừa",
    story: "Nốt cuối của màu ô-liu. Chữ nhật thẳng, tròng nâu không bóp tương phản.",
    stock: 6,
    rating: 4.9,
    reviews: 52,
  },
];

export const filters = [
  { id: "all", label: "Tất cả" },
  { id: "metal", label: "Kim loại" },
  { id: "acetate", label: "Acetate" },
  { id: "sport", label: "Thể thao" },
] as const;

export type FilterId = (typeof filters)[number]["id"];

export const categoryLabel: Record<Category, string> = {
  metal: "Kim loại",
  acetate: "Acetate",
  sport: "Thể thao",
};

export const situations = [
  {
    id: "city" as const,
    title: "Nắng phố",
    productId: "solstice",
    line: "Hợp phần lớn. Cặp người ta giữ.",
  },
  {
    id: "drive" as const,
    title: "Đi xa",
    productId: "atlas",
    line: "Tròng phẳng. Nhìn gương không chói.",
  },
  {
    id: "coast" as const,
    title: "Gần nước",
    productId: "harbor",
    line: "Tròng khói. Dày, ngồi chắc.",
  },
  {
    id: "narrow" as const,
    title: "Mặt hẹp",
    productId: "lumen",
    line: "16 gram. Cặp tròn nhỏ.",
  },
];

const pairWith: Record<string, string> = {
  solstice: "harbor",
  harbor: "solstice",
  mira: "lumen",
  lumen: "mira",
  drift: "atlas",
  atlas: "drift",
  cove: "rio",
  rio: "cove",
};

export function pairFor(ids: string[]) {
  for (const id of ids) {
    const next = pairWith[id];
    if (next && !ids.includes(next)) return getProduct(next);
  }
  return undefined;
}

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function money(dong: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(dong);
}

export type QuoteLine = {
  product: Product;
  lens: string;
  qty: number;
  lineTotal: number;
};

export function quote(lines: { productId: string; lens: string; qty: number }[], promo: string | null) {
  const detailed: QuoteLine[] = [];
  for (const line of lines) {
    const product = getProduct(line.productId);
    if (!product) continue;
    detailed.push({
      product,
      lens: line.lens,
      qty: line.qty,
      lineTotal: product.price * line.qty,
    });
  }
  const subtotal = detailed.reduce((sum, line) => sum + line.lineTotal, 0);
  const discount = promo === PROMO_CODE ? Math.round(subtotal * PROMO_RATE) : 0;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_CENTS ? 0 : SHIPPING_CENTS;
  const total = subtotal - discount + shipping;
  const untilFree = Math.max(0, FREE_SHIPPING_CENTS - subtotal);
  const count = detailed.reduce((sum, line) => sum + line.qty, 0);
  return { detailed, subtotal, discount, shipping, total, untilFree, count };
}

export const craft = [
  {
    title: "Kính khoáng",
    copy: "Nặng hơn nhựa một gram, vẫn trong sau một mùa trong túi. Tròng nào cũng chặn UV400.",
  },
  {
    title: "Phân cực trong kính",
    copy: "Lớp lọc nằm trong tròng. Không bong. Bóng râm vẫn là bóng râm.",
  },
  {
    title: "16–26 gram",
    copy: "Thép hoặc acetate đánh bóng. Đệm mũi chỉnh được. Càng không cấn.",
  },
];

export const reviews = [
  {
    id: "linh",
    quote: "Bốn giờ, Solstice trên xe. Vạch đường thấy lại.",
    name: "Linh Phạm",
    place: "Quận 3",
    product: "Solstice",
    stars: 5,
    image: "/concepts/pho.jpg",
  },
  {
    id: "khang",
    quote: "Tưởng dày quá. Giờ Harbor là cặp duy nhất ở cửa.",
    name: "Minh Khang",
    place: "Đà Nẵng",
    product: "Harbor",
    stars: 5,
    image: "/concepts/cafe.jpg",
  },
  {
    id: "my",
    quote: "Tròng mật ong đẹp, không bị giả.",
    name: "Hà My",
    place: "Hà Nội",
    product: "Mira",
    stars: 5,
  },
  {
    id: "tuan",
    quote: "Gương hơi gắt. Vào quán vẫn đọc menu được.",
    name: "Tuấn Anh",
    place: "Biên Hòa",
    product: "Drift",
    stars: 4,
  },
];

export const faqs = [
  {
    q: "Có phân cực thật không?",
    a: "Có. Tròng nào cũng đúc lớp phân cực trong kính khoáng, thêm UV400. Hướng lên màn hình là thấy nó cắt.",
  },
  {
    q: "Không vừa mặt thì sao?",
    a: "30 ngày, đã đeo cũng được. Phí gửi về mình chịu. Phần lớn hợp gọng vừa: Solstice, Harbor, Rio. Lumen cho mặt hẹp. Cove cho mặt rộng.",
  },
  {
    q: "Làm kính cận được không?",
    a: "Đợt này không. Đây là kính mát không độ. Cần độ thì kẹp một lớp mỏng sau Solstice hoặc Lumen.",
  },
  {
    q: "Trong hộp có gì?",
    a: "Gọng, hộp da cognac, và khăn. Hộp không phải món cộng thêm ở bước thanh toán.",
  },
  {
    q: "Bao lâu thì tới?",
    a: "Đặt trước 2 giờ chiều, hôm làm việc kế gửi. Thường 2–4 ngày. Freeship từ 1,5 triệu, không thì 30.000đ.",
  },
  {
    q: "VELA10 tính thế nào?",
    a: "Giảm 10% trên giá gọng, kể cả Rio đang giảm. Không trừ phí ship 30.000đ.",
  },
];
