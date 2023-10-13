import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:3000";

var httpLink = {
  getAllProduct: apiUrl + "/api/products",
  deleteProductById: apiUrl + "/api/products",
  getProductById: apiUrl + "/api/products",
  saveProduct: apiUrl + "/api/products"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllProducts(): Observable<any> {
    return this.webApiService.get(httpLink.getAllProduct);
  }
  public deleteProductById(model: any): Observable<any> {
    return this.webApiService.delete(httpLink.deleteProductById+ '/' + model);
  }
  public getProductById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getProductById + '/' + model);
  }
  public saveProduct(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveProduct, model);
  }  
}                          
