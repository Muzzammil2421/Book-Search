import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { AuthResponse } from '../../models/auth-response.model';
import { NotificationService } from '../../auth/notification.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private _authService: AuthService, private router: Router,
     private notificationService : NotificationService) { }
  user: AuthResponse | null = null;
  ngOnInit(): void {
    this._authService.user.subscribe(userData => {
      this.user = userData;
    });
  }
  
  handleLoginOrSignOut() {
    if(this.user) {
      this._authService.signOut();
      this.notificationService.showInfo("You are logged out.", "Info");
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSearch(query: string) {
    this.router.navigate(['/books'], { queryParams: { search: query } });
  }
}
