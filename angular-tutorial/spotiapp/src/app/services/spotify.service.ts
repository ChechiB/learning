import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) { }

  getNewReleases(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQD7nskRtEdMOsFuWSUTd6SkBex7D5etWDF7tR-gIWDET_ZBMSLtIhVn-mEI5sKc8YSy4fD3A4JN39me-Gc'
    });

    return this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers });
  }
}
