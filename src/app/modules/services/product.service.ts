import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CallserviceService {

  private baseUrl = '/api/order-status'; // Updated API base URL

  constructor(private http: HttpClient) { }

  // Method to get the status of an order
  getOrderStatus(orderId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${orderId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Method to update the status of an order
  updateOrderStatus(orderId: any, status: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${orderId}`, { status }).pipe(
      catchError(this.handleError)
    );
  }

  // Method to get all order statuses
  getAllOrderStatuses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`).pipe(
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
