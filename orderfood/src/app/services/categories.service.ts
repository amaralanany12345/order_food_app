import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategory } from '../icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient:HttpClient) { }

  getAllCategories():Observable<Icategory[]>{
    return this.httpClient.get<Icategory[]>(`http://localhost:3000/categories`)
  }
}
