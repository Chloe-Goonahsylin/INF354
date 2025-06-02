import { Injectable } from '@angular/core';
import { Observable, map, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUser } from '../shared/register-user';
import { LoginUser } from '../shared/login-user';
import { User } from '../shared/user';
import { Product } from '../shared/product';

@Injectable({
  providedIn: 'root'
})

export class APIService {

apiUrl = 'http://localhost:5240/api/'
//API endspoint called 
httpOptions ={
  headers: new HttpHeaders({
    ContentType: 'application/json'
  })
}
  constructor(private httpClient: HttpClient) {
  }

  RegisterUser(registerUser: RegisterUser){
    return this.httpClient.post(`${this.apiUrl}Authentication/Register`, registerUser, this.httpOptions)
  }

  getProducts() {
    return this.httpClient.get(`${this.apiUrl}Store/ProductListing`)
    .pipe(map(result => result))
  }

  LoginUser(loginUser: LoginUser){
    return this.httpClient.post<User>(`${this.apiUrl}Authentication/Login`, loginUser, this.httpOptions)
  }

  addProduct(file:FormData){
    
    return this.httpClient.post(`${this.apiUrl}Store/AddProduct`, file)
  }

  getBrands(): Observable<any>
  {
    return this.httpClient.get(`${this.apiUrl}Store/Brands`)
    .pipe(map(result => result))
  }

  getProductTypes(): Observable<any>
  {
    return this.httpClient.get(`${this.apiUrl}Store/ProductTypes`)
    .pipe(map(result => result))
  }

  GenerateProductReport(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Report/ProductsReport`)
    .pipe(map(result => result))
  }
}
