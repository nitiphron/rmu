import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CallserviceService {

  private baseUrl = '/api/cart'; // Assuming your API base URL

  constructor(private http: HttpClient) { }

  // Method to remove item from cart
  removeFromCart(productId: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${productId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Method to clear cart
  clearCart(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/clear`).pipe(
      catchError(this.handleError)
    );
  }

  // Method to get cart items
  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/items`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling function
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
