import { Component, EventEmitter, Input, Output } from '@angular/core';
import { City } from 'src/app/interfaces/city.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() city!: City;
  @Output() editButtonClick = new EventEmitter<City>();

  handleClick(): void {
    this.editButtonClick.emit(this.city);
  }

  handleMissingImage(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/assets/no-image.png'
  }
}
