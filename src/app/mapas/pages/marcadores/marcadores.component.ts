import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css'],
})
export class MarcadoresComponent implements OnInit {
  mapa!: mapboxgl.Map;
  mostrarGeo: boolean = false;
  zoomLevel: number = 15;
  center: [number, number] = [-74.06763555489785, 4.658158946861418];
  marcadores: MarcadorColor[] = [];

  constructor() { }

  @ViewChild('mapa') mapaHtml!: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.mapaHtml.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
    });
    this.createMarker();
    this.recuperarMarcadores();
  }

  ngAfterViewChecked(): void {
    this.mostrarInputGeo();
    this.guardarMarcadores();
  }

  createMarker(): void {
    new mapboxgl.Marker({
      // element: this.customMarker(),
    }).setLngLat( this.center )
      .addTo( this.mapa );
  }

  mostrarInputGeo() {
    const geo = document.getElementById('geo');
    const boton = document.getElementById('boton');
    if (this.mostrarGeo) {
      if (geo) {
        geo.style.width = '100px';
        geo.style.visibility = 'visible'
        geo.style.paddingLeft = '10px'
        geo.style.paddingRight = '10px'
      }
      if (boton) {
        boton.style.transform = 'rotate(90deg)';
      }
    } else {
      if (geo) {
        geo.style.width = '0px';
        geo.style.visibility = 'hidden'
        geo.style.paddingLeft = '0px'
        geo.style.paddingRight = '0px'
      }
      if (boton) {
        boton.style.transform = 'rotate(0deg)';
      }
    }
  }

  agregarMarcador(): void{
    const customColor = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker( 
      {
        color: customColor,
        draggable: true,
      }
      )
        .setLngLat( this.center )
        .addTo( this.mapa )

        this.marcadores.push( { color: customColor, marker: nuevoMarcador } );
        // this.guardarMarcadores();
  }

  irMarcador( marker: mapboxgl.Marker ): void {
    const { lng, lat } = marker.getLngLat();
    this.mapa.flyTo( { center: { lng, lat}} );
  }

  guardarMarcadores(){
    const lngLatArray: MarcadorColor[] = [];
    this.marcadores.forEach( (m) => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      lngLatArray.push( 
        {
          color: color,
          center: [lng, lat]
        }
       );
    });

    localStorage.setItem('marcadores', JSON.stringify( lngLatArray ));
  }

  recuperarMarcadores(){
    if ( !localStorage.getItem('marcadores') ) {
      return;
    }
    const lngLatArray: MarcadorColor[] = JSON.parse( localStorage.getItem('marcadores')! );
    lngLatArray.forEach( (m) => {
      const newMarker = new mapboxgl.Marker(
        {
          color: m.color,
          draggable: true
        }
      ).setLngLat( m.center! )
       .addTo( this.mapa );

       this.marcadores.push(
        {
          color: m.color,
          marker: newMarker
        }
      );

    });

  }

  borrarMarcador( index: number ){
    this.marcadores[index].marker?.remove();
    this.marcadores.splice(index, 1);
    this.guardarMarcadores();
  }

  customMarker(): HTMLElement {
    const myMarker: HTMLElement = document.createElement('div');
    myMarker.className = 'marker';
    myMarker.style.backgroundImage = 'url(/assets/mapbox-icon.png)'
    myMarker.style.width = '50px';
    myMarker.style.height = '50px';
    myMarker.style.fontSize = '20em';
    myMarker.style.backgroundSize = 'cover';
    myMarker.style.cursor = 'pointer';
    myMarker.style.borderRadius = '50%'
    return myMarker;
  }

}

interface MarcadorColor {
  color: string,
  marker?: mapboxgl.Marker,
  center?: [number, number]
}
