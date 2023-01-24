import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  public termino : string = "";
  public heroes : Heroe[] = [];
  public HeroeSeleccionado : Heroe | undefined;

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
  }

  buscando(){
    if(this.termino.trim().length == 0) return;
    
    this.heroesService.getSugerencias(this.termino.trim()).subscribe({
      next: (data) => this.heroes = data,
      error: () => console.error("No se pudieron obtener los datos."),
    })
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent): void {
    if(!event.option.value) {
      this.HeroeSeleccionado = undefined;
      return
    };

    const heroe : Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroeById(heroe.id || '').subscribe({
      next: (data) => this.HeroeSeleccionado = data,
      error: () => console.error("No se pudieron obtener los datos."),
    })
  }

}
