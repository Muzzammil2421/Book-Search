import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book-model';
import { AuthService } from '../../auth/auth.service';
import { FavoritesService } from '../../services/favorites.service';
import { NotificationService } from '../../auth/notification.service';

@Component({
  selector: 'app-favourites',
  standalone: false,
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',
})
export class FavouritesComponent implements OnInit {
  loading: boolean = false;
  error: string = '';
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 9;
  favorites: Book[] = [];
  user: any = null;

  constructor(
    private _authService: AuthService,
    private favoritesService: FavoritesService,
    private notificationService: NotificationService
  ) {}

  pageChanged(event: any) {
    this.currentPage = event;
    this.fetchFavourites();
  }

  ngOnInit(): void {
    this.loading = true;
    this._authService.user.subscribe((userData: any) => {
      this.user = userData.user;
    });
    this.fetchFavourites();
  }

  fetchFavourites() {
    this.favoritesService
      .getFavouriteBooks(this.user.id, this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response: any) => {
          this.favorites = response.data
            .map((fav: any) => {
              if (fav.book) {
                return { ...fav.book, documentId: fav.documentId };
              }
              return null;
            })
            .filter((book: any) => book !== null);
          this.totalItems = response.meta?.pagination?.total || 0;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = err.message || 'An error occurred while fetching books.';
          this.loading = false;
        },
      });
  }

  removeFromFavourties(book: Book) {
    this.favoritesService.removeFromFavourites(book.documentId).subscribe({
      next: (response: any) => {
        this.notificationService.showSuccess(
          `Book "${book.title}" removed from favorites.`,
          'Success'
        );
        this.favorites = this.favorites.filter((fav) => fav.id !== book.id);
      },
      error: (err: any) => {
        this.notificationService.showError(
          'Got an error while removing book from favorites.',
          'Error'
        );
      },
    });
  }
}
