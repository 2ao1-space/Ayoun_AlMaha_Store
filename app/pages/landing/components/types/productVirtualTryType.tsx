export interface ProductImage {
  color: string;
  img: string;
}

export interface VirtualTryProduct {
  id: number;
  product_name: string;
  product_images: ProductImage[];
  product_price: string;
  product_discount: string;
  product_brand: string;
}
