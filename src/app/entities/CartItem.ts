import {Product} from "./Product";
import {Cart} from "./Cart";

export interface CartItem {
  id: number | undefined;
  cart: Cart | undefined;
  product: Product;
  quantity: number;

}
