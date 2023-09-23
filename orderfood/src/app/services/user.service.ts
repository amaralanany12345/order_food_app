import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Iuser } from '../iuser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions
  constructor(private httpClient:HttpClient,private router:Router) {
    this.httpOptions={
      headers: new HttpHeaders({
        'content-Type':'application/json',
        // Authorization:"my-auth-token"   
      }),
    }}

  logIn():Observable<Iuser[]>{
    return this.httpClient.get<Iuser[]>(`http://localhost:3000/users`)
  }  
  signUp(newUser:Iuser):Observable<Iuser>{
    return this.httpClient.post<Iuser>(`http://localhost:3000/users`,JSON.stringify(newUser),this.httpOptions)
    .pipe(
      retry(2),
      catchError((err:any)=>{
        console.error(err)
        return throwError(()=>new Error ('post error'))
      })
    )
  }
}
