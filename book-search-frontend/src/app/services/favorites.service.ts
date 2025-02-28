import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) { }

  getFavouriteBooks(id: number): any {
    return this.http.get(`favourite-books?filters[user][id]=${id}`);
  }
}
