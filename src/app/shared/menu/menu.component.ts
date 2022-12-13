import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: Menu[] = [
    { nombre: 'Full Screen', ruta: './app/mapas/fullscreen' },
    { nombre: 'Marcadores', ruta: './app/mapas/marcadores' },
    { nombre: 'Propiedades', ruta: './app/mapas/propiedades' },
    { nombre: 'Zoom', ruta: './app/mapas/zoom' },
  ]

  @Input() title: string ='';

  constructor() { }

  ngOnInit(): void {
  }

}

interface Menu {
  nombre: string,
  ruta: string
}
