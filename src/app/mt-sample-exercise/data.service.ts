import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {} // End constructor()

  getFarms(url: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(url, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  } // End funtcion getFarms()
} // End class DataService
