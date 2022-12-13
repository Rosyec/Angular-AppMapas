import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements OnInit {
  mostrarZoom: boolean = false;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 3;
  maxZoom: number = 20;
  minZoom: number = 3;
  center: [number, number] = [-74.06763555489785, 4.658158946861418];

  @ViewChild('mapa') mapaHtml!: ElementRef;
  @ViewChild('myRange') myRange!: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(){
    this.mapa.off( 'zoom', () => {} );
    this.mapa.off( 'move', () => {} );
  }

  ngAfterViewInit() {
    this.mapa = new mapboxgl.Map({
      container: this.mapaHtml.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
    });
    this.mapa.setMaxZoom(this.maxZoom);
    this.mapa.setMinZoom(this.minZoom);
    this.onZoom();
    this.onCoordinates();
  }

  ngAfterViewChecked(): void {
    this.mostrarInputRange();
  }

  mostrarInputRange() {
    const range = document.getElementById('range');
    if (this.mostrarZoom) {
      if (range) {
        range.style.width = '200px';
        range.style.visibility = 'visible'
        range.style.paddingLeft = '10px'
        range.style.paddingRight = '10px'
      }
    } else {
      if (range) {
        range.style.width = '0px';
        range.style.visibility = 'hidden'
        range.style.paddingLeft = '0px'
        range.style.paddingRight = '0px'
      }
    }
  }

  zoomOut(): void {
    this.mapa.zoomOut();
  }

  zoomIn(): void {
    this.mapa.zoomIn();
  }

  onInputRange() {
    this.zoomLevel = parseInt(this.myRange.nativeElement.value);
    this.mapa.setZoom(this.zoomLevel);
  }

  onZoom() {
    //Listener del Zoom
    this.mapa.on('zoom', () => {
      const zoomActual = this.mapa.getZoom();
      if (zoomActual <= 20 && zoomActual >= 3) {
        this.zoomLevel = this.mapa.getZoom();
        console.log('OK')
      } else {
        console.log('NOT OK')
      }
    })
  }

  onCoordinates(){
    //Listener del movimiento del mapa
    this.mapa.on( 'move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    } )
  }

}
