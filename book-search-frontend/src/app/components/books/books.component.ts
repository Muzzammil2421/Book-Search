import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book-model';
import { AuthService } from '../../auth/auth.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  searchQuery: string = '';
  books: Book[] = [];
  loading: boolean = false;
  error: string = '';
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 9;

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private _authService: AuthService,
    private favoritesService:FavoritesService
  ) {}

  ngOnInit(): void {
    this._authService.me().subscribe(userData => {
      this.user = userData;
      this.favoritesService.getFavouriteBooks(this.user.id).subscribe({
        next: (response: any) => {
          console.log(response);
        }
      });
    });
    this.route.queryParams.subscribe((params) => {
      if (params['search']) {
        this.searchQuery = params['search'];
        this.fetchBooks();
      }
    });
  }

  favorites: Book[] = [];
  user: any = null;

  isFavorite(book: Book): boolean {
    return this.favorites.some((fav) => fav.id === book.id);
  }

  addToFavorites(book: Book): void {
  }

  fetchBooks(): void {
    this.loading = true;
    this.bookService.searchBooks(this.searchQuery, this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response: any) => {
          this.books = response.data;
          this.totalItems = response.meta?.pagination?.total || 0;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = err.message || 'An error occurred while fetching books.';
          this.loading = false;
        }
      });
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    this.fetchBooks();
  }
}
