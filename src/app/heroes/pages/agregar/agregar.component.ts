import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  public publishers = [
    {id: "DC Comics",
    desc: "DC - Comics"},
    {id: "Marvel Comics",
    desc: "Marvel - Comics"},
  ]

  public heroe : Heroe = {
    superhero:"",
    publisher: undefined,
    alter_ego: "",
    first_appearance: "",
    characters:"",
    alt_imagen:""
  };

  isButtonDisabled : boolean = true;

  constructor(
    private heroeService : HeroesService,
    private activatedRouted : ActivatedRoute,
    private router : Router

  ) { }

  ngOnInit(): void {

    if(this.router.url.includes('editar')){
      this.activatedRouted.params
      .pipe(
        switchMap(({id}) => this.heroeService.getHeroeById(id)),
      )
      .subscribe(
        heroe => {
          this.heroe = heroe;
          this.isButtonDisabled = false;
        });
    }
    
  }

  guardar(){
    if(this.heroe.superhero.trim().length > 0){
      if(this.heroe.id){
        this.heroeService.actualizarHeroe(this.heroe).subscribe({
          next: (heroe) => this.heroe = heroe,
          error: (error) => console.log("no se pudo actualizar el heroe"),
        })
      } else{
        this.heroeService.agregarHeroe(this.heroe).subscribe({
          next: (heroe) => this.router.navigate(['/heroes/editar', heroe.id]),
          error: (error) => console.log("no se pudo guardar el heroe"),
        })
      }
    }
  }

  validarSuperHeroe(){
    if(this.heroe.superhero.trim().length > 0){
      this.isButtonDisabled = false;
    } else{
      this.isButtonDisabled = true;
    }
  }

}
