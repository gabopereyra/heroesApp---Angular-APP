import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
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

  constructor(private heroeService : HeroesService) { }

  ngOnInit(): void {
  }

  guardar(){
    if(this.heroe.superhero.trim().length > 0){
      this.heroeService.agregarHeroe(this.heroe).subscribe({
        next: (heroe) => this.heroe = heroe,
        error: (error) => console.log("no se pudo guardar el heroe"),
      })
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
