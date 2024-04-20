export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: {
    id: number;
    name: string;
    description: string;
  };
}
