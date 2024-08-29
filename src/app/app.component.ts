import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapDirectionsService } from '@angular/google-maps';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 19.0490136, lng: -98.1238574 };
  zoom = 12;
  coordsStartControl = new FormControl('0') ;
  coordsEndControl = new FormControl('0') ;
  coordsStart = { coords: { lat: 0, lng: 0 }, place: 'vacio' };
  coordsEnd= { coords: { lat: 0, lng: 0 }, place: 'vacio' };
  places = [{ coords: { lat: 19.0413948, lng: -98.2088477 }, place: 'Puebla, Pue.' },
    { coords: {lat:19.1968317, lng:-99.1357763}, place: 'CD MX' },
    { coords: {lat:19.3138226, lng: -98.2520115}, place: 'Tlaxcala, Tlaxc.' },
    { coords: {lat:18.9233237, lng:-99.5257734}, place: 'Cuernavaca, Mor.' },
    { coords: {lat:19.1968317, lng:-96.1362595}, place: 'Veracruz' },
  
  ];

  //@ts-ignore
  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;

  constructor(public mapDirectionsService: MapDirectionsService) {}

  ngOnInit(): void {}

  calculateAndDisplayRoute() {
    console.log(this.coordsStart.coords)
    console.log(this.coordsEnd.coords)

    const request: google.maps.DirectionsRequest = {
      destination: this.coordsStart.coords,
      origin: this.coordsEnd.place,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    this.directionsResults$ = this.mapDirectionsService
      .route(request)
      .pipe(map((response) => response.result));

      console.log(this.directionsResults$);
  }
}
