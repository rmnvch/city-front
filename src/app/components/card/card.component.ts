import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICity } from 'src/app/pages/main/main.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() city!: ICity;
  @Output() editButtonClick = new EventEmitter<ICity>();

  handleClick(): void {
    this.editButtonClick.emit(this.city);
  }

  handleMissingImage(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/assets/no-image.png'
  }
}
