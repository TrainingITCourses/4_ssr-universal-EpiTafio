import { Component, OnInit } from '@angular/core';
import lanzamientosJS from '../../assets/data/launches.json';
import estadosJS from '../../assets/data/launchstatus.json';
import agenciasJS from '../../assets/data/agencies.json';
import tiposJS from '../../assets/data/missiontypes.json';

@Component({
  selector: 'app-contenedor-container',
  templateUrl: './contenedor-container.component.html',
  styleUrls: []
})
export class ContenedorContainerComponent implements OnInit {
  public lanzamientos: any[] = [];
  public resultado  = { contenido: 0 };
  public filtro = { valor: 0 };

  constructor() { }

  ngOnInit() {
  }

  onSearch = (searchText: any) =>  {
    this.filtra(searchText);
  }

  onFiltratipo = (opcion: any) => {
    this.filtro.valor = opcion;
    this.resetear();
  }

  filtra = (searchText: any) => {
   this.resetear();
   const search = searchText.toLowerCase();
    if ( 1 == this.filtro.valor ) {
        this.porNombre(search);
      } else if ( this.filtro.valor == 2) {
         this.porEstados(search);
      } else if ( this.filtro.valor == 3) {
         this.porAgencias(search);
      } else if ( this.filtro.valor == 4 ) {
         this.porTipos(search);
      } else {
        console.log('ELIJA CRITERIO');
        this.lanzamientos.push('¡¡¡ ELIJA CRITERIO !!! ');
   }
  }

  porNombre = (search: any) => {
    if ( search.length !== 0 ) {
      lanzamientosJS.launches.forEach( (lanza) => {
        if ( lanza.name.toLowerCase().includes(search)) {
          this.resultado.contenido ++;
          this.lanzamientos.push( 'Lanzamiento: ' +  lanza.name );
        }
      });
    }
  }

  porEstados = (search: any) => {
    if ( search.length !== 0 ) {
      lanzamientosJS.launches.forEach( (lanza)  => {
        estadosJS.types.forEach( (esta) => {
          if ( esta.name.toLowerCase().includes(search) || esta.description.toLowerCase().includes(search)  ) {
            if (esta.id === lanza.status) {
              this.resultado.contenido ++;
              this.lanzamientos.push( 'Lanzamiento: ' +  lanza.name + '   -   ' + esta.name);
            }
          }
        });
       });
    }
  }

  porAgencias = (search: any) => {
    if ( search.length !== 0 ) {
      agenciasJS.agencies.forEach( (agen) => {
        if ( agen.name.toLowerCase().includes(search) ) {
          lanzamientosJS.launches.forEach( (lanza) => {
          lanza.missions.forEach( (misi) => {
            if ( misi.agencies !== null ) {
              misi.agencies.forEach ( (agenlan) => {
                if ( agenlan.name === agen.name ) {
                  this.resultado.contenido ++;
                  this.lanzamientos.push('Lanzamiento: ' +  lanza.name + '   -   ' + agen.name);
                  }
                });
              }
            });
          });
        }
      });
    }
  }

  porTipos = (search: any) => {
    if ( search.length !== 0 ) {
      tiposJS.types.forEach( (tipo) => {
        if ( tipo.name.toLowerCase().includes(search) ) {
          lanzamientosJS.launches.forEach( (lanza) => {
            lanza.missions.forEach( (misi) => {
              if ( tipo.id === misi.type ) {
                this.resultado.contenido ++;
                this.lanzamientos.push('Lanzamiento: ' +  lanza.name + '   -   ' + tipo.name);
              }
            });
          });
        }
      });
    }
  }

  resetear = () => {
    this.lanzamientos = [];
    this.resultado.contenido = 0;
  }

}
