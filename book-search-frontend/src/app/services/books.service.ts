import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {}

  searchBooks(query: string, page: number, pageSize: number): any {
    return this.http.get(`books?filters[title][$containsi]=${query}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
  }  

  searchBookById(id: number): any {
    return this.http.get(`books?filters[id]=${id}`);
  }
}
