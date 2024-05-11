import { Injectable } from '@angular/core';
import { Product } from '../../../entities/Product';
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

  updateProduct(id: number | undefined, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
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

}

