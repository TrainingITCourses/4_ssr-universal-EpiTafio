import { ChangeDetectionStrategy, Component, Input, OnInit  } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-listado-presenter',
  templateUrl: './listado-presenter.component.html',
  styleUrls: []
})
export class ListadoPresenterComponent implements OnInit {
  @Input() public lanzamientos: any[];
  @Input() public resultado = { contenido: 99 };
  constructor() { }

  ngOnInit() {
  }

}
