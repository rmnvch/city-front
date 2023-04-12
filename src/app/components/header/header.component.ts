import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Output() searchClick = new EventEmitter<string>();

  value = '';

  handleClick() {
    this.searchClick.emit(this.value);
  }
}
