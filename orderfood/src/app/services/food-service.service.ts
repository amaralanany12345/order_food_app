import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Ifoods } from '../ifoods';
import { Cart } from '../cart';
import { Orders } from '../orders';


@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {

  httpOptions
  constructor(private httpClient:HttpClient,private router:Router) {
    this.httpOptions={
      headers: new HttpHeaders({
        'content-Type':'application/json',
        // Authorization:"my-auth-token"   
      }),
    }}

    getAllFoods():Observable<Ifoods[]>{
      return this.httpClient.get<Ifoods[]>(`http://localhost:3000/foods`)
    }

    addToCart(newCart:Cart):Observable<Cart>{
      return this.httpClient.post<Cart>('http://localhost:3000/customerCart',JSON.stringify(newCart),this.httpOptions)
      .pipe(
        retry(2),
        catchError((err:any)=>{
          console.error(err)
          return throwError(()=>new Error ('post error'))
        })
      )
    }
    
    deletteItem(itemId:number):Observable<Cart>{
      return this.httpClient.delete<Cart>(`http://localhost:3000/customerCart/${itemId}`)
    }

    getCustomerCart(customerEmail:string):Observable<Cart[]>{
      return this.httpClient.get<Cart[]>(`http://localhost:3000/customerCart?email=${customerEmail}`)
    }

    applyOrder(newOrder:Orders):Observable<Orders>{
      return this.httpClient.post<Orders>('http://localhost:3000/orders',JSON.stringify(newOrder),this.httpOptions)
      .pipe(
        retry(2),
        catchError((err:any)=>{
          console.error(err)
          return throwError(()=>new Error ('post error'))
        })
      )
    }

}
