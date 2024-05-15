import { Injectable } from '@angular/core';
import { Product } from '../../entities/Product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8055/api/product';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/all`);
  }

  deleteProduct(id: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  updateProduct(productId: string, productData: any, file: File) {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('stockQuantity', productData.stockQuantity);
    formData.append('image', file);

    return this.http.put<any>(`${this.apiUrl}/${productId}`, formData);
  }


  addProduct(product: any, image: File): Observable<Product> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('category', product.category?.toString()); // Use optional chaining here
    formData.append('price', product.price?.toString());
    formData.append('stockQuantity', product.stockQuantity?.toString());
    formData.append('image', image);
    return this.http.post<Product>(`${this.apiUrl}/add`, formData);
  }


  getImageSrc(product: Product): string {
    if (product.imageData) {
      return `data:image/jpeg;base64,${product.imageData}`;
    } else {
      return 'assets/placeholder-image.jpg'; // Replace with your placeholder image path
    }
  }
}

