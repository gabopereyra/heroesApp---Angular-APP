import { Pipe, PipeTransform } from '@angular/core';
import { HeroesRoutingModule } from '../heroes-routing.module';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipePipe implements PipeTransform {

  transform(heroe : Heroe): unknown {
    return (heroe.id) ? `assets/heroes/${heroe.id}.jpg` : `assets/no-image.png`;
  }
}
