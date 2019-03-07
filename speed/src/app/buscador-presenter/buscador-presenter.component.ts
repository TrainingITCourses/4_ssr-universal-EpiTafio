import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buscador-presenter',
  templateUrl: './buscador-presenter.component.html',
  styleUrls: []
})
export class BuscadorPresenterComponent implements OnInit {
  @Output() public search = new EventEmitter<string>();
  @Output() public filtros = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  public cambiaFiltro = (valor: any) => {
    console.log('Cambia filtro ' + valor );
    this.filtros.next(valor);
  }

  public hayTexto = (texto: any) => {
    console.log('texto busqueda ' + texto.toLowerCase());
    this.search.next(texto.toLowerCase());
  }

}
