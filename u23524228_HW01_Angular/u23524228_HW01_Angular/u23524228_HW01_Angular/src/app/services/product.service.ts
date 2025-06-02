import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root' 
})
export class ProductService 
{
  private apiUrl = 'https://localhost:7002/api/Product'; // base URL for the Product API

  constructor(private http: HttpClient) {} 

  
  // fetches a list of all products from the API
  getProducts(): Observable<Product[]> 
  {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // fetches a single product by its ID
  getProductById(id: number): Observable<Product> 
  {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // adds a new product to the API
  addProduct(product: Product): Observable<Product> 
  {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // updates an existing product by its ID
  updateProduct(id: number, product: Product): Observable<Product> 
  {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // deletes a product by its ID
  deleteProduct(id: number): Observable<void> 
  {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
