import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styleUrls: ['./mini-mapa.component.css']
})
export class MiniMapaComponent implements OnInit {

  constructor() { }

  @Input() lngLat: [number, number] = [0, 0];
  @ViewChild('mapa') mapaHTML!: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const mapa = new mapboxgl.Map(
      {
        container: this.mapaHTML.nativeElement,
        center: this.lngLat,
        style: 'mapbox://styles/mapbox/streets-v12',
        zoom: 15,
        interactive: false
      }
    );

    const marker = new mapboxgl.Marker().setLngLat( this.lngLat ).addTo( mapa );

  }

}
