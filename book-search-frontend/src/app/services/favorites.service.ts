import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private http: HttpClient) {}

  getFavouriteBooks(id: number, page: number, pageSize: number): any {
    return this.http.get(
      `favourite-books?filters[user]=${id}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
  }

  getAllFavouriteBooks(id: number) {
    return this.http.get(
      `favourite-books?filters[user]=${id}&populate=*&pagination[pageSize]=-1`
    );
  }

  addToFavouriteBooks(id: number, bookID: number) {
    const payload = {
      data: {
        user: id,
        book: bookID,
      },
    };

    return this.http.post('favourite-books', payload);
  }

  removeFromFavourites(favouriteBookId: string) {
    return this.http.delete(`favourite-books/${favouriteBookId}`);
  }
}
