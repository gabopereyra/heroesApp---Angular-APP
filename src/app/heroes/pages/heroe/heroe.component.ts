import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  public heroe : Heroe | undefined;

  constructor(
    private activatedRoute : ActivatedRoute,
    private heroeService : HeroesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.heroeService.getHeroeById(id))
    )
    .subscribe(
      heroe => this.heroe = heroe 
    );
    
  }

}
