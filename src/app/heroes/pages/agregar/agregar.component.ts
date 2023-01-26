import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';

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
    publisher: Publisher.DCComics,
    alter_ego: "",
    first_appearance: "",
    characters:"",
    alt_imagen:""
  };

  constructor() { }

  ngOnInit(): void {
  }

}
