export interface ProductImage {
  color: string;
  img: string;
}

export interface Product {
  id: string | number;

  product_name: string;
  title: string;
  brand: string;
  product_brand: string;

  gender: "men" | "women" | "unisex";
  tag: "best" | "new" | "sale";
  category: "medical" | "sun" | "sports";
  product_type: string[];
  glass_type: string[];

  product_images: ProductImage[];
  main_image: string;

  product_price: string;
  price: number;
  product_discount: string;
  discount_price?: number;

  product_description: string;
  description: string;

  inventor_Kits: number;
  isfavoret: boolean;
  isWhishlist: boolean;
  isCart: boolean;
  isSale: boolean;
  isBestSeller: boolean;
}

export function carouselToFullProduct(item: Partial<Product>): Product {
  return {
    id: item.id || "",
    product_name: item.title || item.product_name || "",
    title: item.title || item.product_name || "",
    brand: item.brand || item.product_brand || "",
    product_brand: item.brand || item.product_brand || "",
    gender: item.gender || "unisex",
    tag: item.tag || "new",
    category: item.category || "medical",
    product_type: item.product_type || [item.category || "medical"],
    glass_type: item.glass_type || [],
    product_images: item.product_images || [
      { color: "#333", img: item.main_image || "/images/product_2.png" },
    ],
    main_image: item.main_image || "/images/product_2.png",
    product_price: item.product_price || String(item.price || 0),
    price: item.price || Number(item.product_price || 0),
    product_discount: item.product_discount || String(item.discount_price || 0),
    discount_price: item.discount_price || Number(item.product_discount || 0),
    product_description: item.description || item.product_description || "",
    description: item.description || item.product_description || "",
    inventor_Kits: item.inventor_Kits || 10,
    isfavoret: item.isfavoret || false,
    isWhishlist: item.isWhishlist || false,
    isCart: item.isCart || false,
    isSale: item.isSale || item.tag === "sale",
    isBestSeller: item.isBestSeller || item.tag === "best",
  };
}
