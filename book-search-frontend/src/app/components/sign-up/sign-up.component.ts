import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from "@angular/router"
import { ErrorService } from '../../auth/error.service';
import { AuthService } from '../../auth/auth.service';
import { AuthResponse } from '../../models/auth-response.model';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router, private _errorService: ErrorService) {
  }

  user: AuthResponse | null = null;
  loading:boolean=false;
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
      name: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[A-Za-z][A-Za-z .,-]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  error: string = '';

  submit() {
    if (this.form.valid) {
      this.loading = false;
      const { name, email, password } = this.form.value;
      this._authService.signUp(name.trim(), email, password).subscribe({
        next:response => this.handleSuccessfullSignUp(response),
        error:error => this.handleErrorSignUp(error)
      })
    }
  }

  handleSuccessfullSignUp(response: any) {
    const navigationExtras: NavigationExtras = { state: { data: 'Congratulations! An email for confirmation has been sent to your email address.' } };
    this.router.navigate(['login'], navigationExtras);
    this.loading = false;
  }

  handleErrorSignUp(error: any) {
    let e = error;
    this.error = e.error.error.message;
    this.error = this.error ? this.error : 'An error occurred.';
    console.log("Here");
    this.loading = true;
  }
}
