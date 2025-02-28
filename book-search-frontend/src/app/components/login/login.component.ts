import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from "@angular/router"
import { ErrorService } from '../../auth/error.service';
import { AuthResponse } from '../../models/auth-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signedUpMessage!: string;
  loading:boolean=false;
  user: AuthResponse | null = null;
  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router, private _errorService: ErrorService) {
    this._authService.user.subscribe(userData => {
      this.user = userData;
    });
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      const state = navigation.extras.state as { data: string };
      this.signedUpMessage = state ? state.data : '';
    }
  }

  error!: string;
  form!: FormGroup
  ngOnInit(): void {
    this._authService.user.subscribe(userData => {
      this.user = userData;
      this.loading=true;
    });

    if (this.user) {
      this.router.navigate(["/favourites"])
    }

    this.form = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }
  submit() {
    if (this.form.valid) {
      this.loading = false;
      const { identifier, password } = this.form.value;
      this._authService.signIn(identifier, password).subscribe({
        next:response=> this.successfullLogin(response),
        error:error=> this.handleLoginError(error)
      });
    }
  }

   successfullLogin(response : any) {
    this._authService.setUser(response);
    this.router.navigate(["/favourites"]);
   }

   handleLoginError(error: any) {
      this.error = this._authService.handleError(error);
      this.loading = true;
   }

}
