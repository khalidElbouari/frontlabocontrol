import {Category} from "./Category";

export class Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: Category;
  imagePath: string | undefined;
  imageData: Uint8Array | undefined; // Add the imageData property

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    stockQuantity: number,
    category: Category,
    imagePath: string,
    imageData: Uint8Array // Add the imageData parameter
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.category = category;
    this.imagePath = imagePath;
    this.imageData = imageData; // Assign the imageData parameter to the imageData property
  }
}
