import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router : Router,
    private _snackBar : MatSnackBar

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
          next: (heroe) => this.mostrarSnackBar("Se ha actualizado el registro!"),
          error: (error) => this.mostrarSnackBar("no se pudo actualizar el heroe"),
        })
      } else{
        this.heroeService.agregarHeroe(this.heroe).subscribe({
          next: (heroe) => {
            this.router.navigate(['/heroes/editar', heroe.id]);
            this.mostrarSnackBar("Se ha creado el registro!");
          },
          error: (error) => this.mostrarSnackBar("no se pudo guardar el heroe"),
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

  borrar(){
    if(this.heroe.id){
      this.heroeService.borrarHeroe(this.heroe.id).subscribe({
        next: () => this.router.navigate(['/heroes/listado']),
        error: () => this.mostrarSnackBar("No se pudo borrar el heroe"),
      });
    }
  }

  mostrarSnackBar(msj : string){
    this._snackBar.open(msj, 'Cerrar', {
      duration: 2500
    });
  }

}
