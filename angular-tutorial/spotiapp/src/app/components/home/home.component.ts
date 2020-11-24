import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  releases: any[] = [];

  /* constructor( private http: HttpClient) { 
    this.http.get('https://restcountries.eu/rest/v2/lang/es')
          .subscribe( (data: any) => {
            this.countries = data;
            console.log(data);
          });
  }
 */

  constructor( private spotifyService: SpotifyService ) {
    this.spotifyService.getNewReleases().subscribe( (data: any) => {
      this.releases = data.albums.items;
    });
  }

  ngOnInit(): void {
  }



}
