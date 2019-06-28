import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) { 
    console.log('Servicio listo Spotify');
    
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBrlUfc9mhyIatiBIrT8jOKFNrDcgw2FmdmT6507mp-r-9wxH6JsXOfVoEAJtrLpNJRW5EVvhqXvUziCMs'
      });

    return this.http.get(url, {headers});

  }

  getNewRealeases() {

  return this.getQuery('browse/new-releases?limit=20')
          .pipe(map(data =>  data['albums'].items))
           
    
  }

  getArtistas(termino : string) {
  
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
            .pipe(map(data => data['artists'].items))
  }

  getArtista( id : string) {
  
    return this.getQuery(`artists/${ id }`)
            
  }

  getTopTracks( id: string) {
      return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                    .pipe(map(data => data['tracks']));
    }

}