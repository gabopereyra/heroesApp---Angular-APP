import { Pipe, PipeTransform } from '@angular/core';
import { HeroesRoutingModule } from '../heroes-routing.module';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipePipe implements PipeTransform {

  transform(heroe : Heroe): unknown {
    if(!heroe.id && !heroe.alt_imagen) return `assets/heroes/${heroe.id}.jpg`;

    if(heroe.alt_imagen) return `assets/heroes/${heroe.alt_imagen}.jpg`;

    return `assets/no-image.png`;
  }
}
