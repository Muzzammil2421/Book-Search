import { Component } from '@angular/core';
import { Book } from '../../models/book-model';

@Component({
  selector: 'app-favourites',
  standalone: false,
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
  searchQuery: string = '';
    books: Book[] = [];
    loading: boolean = false;
    error: string = '';
    totalItems: number = 0;
    currentPage: number = 1;
    itemsPerPage: number = 9;

    pageChanged(event:any) {
      
    }

}
