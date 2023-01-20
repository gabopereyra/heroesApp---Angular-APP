import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  public heroes : Heroe[] = [];

  constructor(private heroesService : HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe({
      next: (data) => this.heroes = data,
      error: () => console.error("No se pudieron obtener los datos."),
  })
  }

}
