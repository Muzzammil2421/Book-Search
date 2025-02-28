import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  apiUrl = 'http://localhost:1337/api/';
  constructor(private _authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let user: any;
    this._authService.user.subscribe(userData => {
      user = userData;
    });
    let request = req.clone({ url: `${this.apiUrl}${req.url}` });
    if (request.url.includes('auth') || request.url.includes('books') && !req.url.includes("favourite-books")) {
      return next.handle(request);
    }
    if (user) {
      request = request.clone({ headers: req.headers.set('Authorization', `Bearer ${user.jwt}`) })
    }
    return next.handle(request);
  }

}




