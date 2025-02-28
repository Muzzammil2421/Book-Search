import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(error: HttpErrorResponse, statusText: string = '') {
    if (!statusText) {
      statusText = error.statusText;
    }
    //else if (error.statusText == 'Bad Request') {

    //}
    let msg = this.errorMsgs[statusText as keyof typeof this.errorMsgs]; // Use keyof to restrict the type of statusText
    if (!msg) {
      msg = error.message ? error.message : error.error ? error.error.message : "there was an error we don't know";
    }
    return msg;
  }

  errorMsgs = {

    "AuthFailed": "Email or password is incorrect.",
    "Bad Request": "Email or password is incorrect.",
    "OK": "Successfull.",
    "Forbidden": "You do not have permissions to do this action.",
    "Not Found": "Page Not Found.",
    "Method Not Allowed": "Something went wrong.",
    "Unauthorized": "Unauthenticated access.",
    "Internal Server Error": "Something went wrong.",
    "Bad Gateway": "Something went wrong.",
    "Service Unavailable": "Server is down.",
    "Created": "Successfully added.",
    "Unknown Error": "Something went wrong.",
    "UserExists": "User or email already registerd please use reset password instead"
  };

}
