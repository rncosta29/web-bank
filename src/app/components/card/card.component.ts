import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,

  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() titulo: string = ''; // Título do card
  @Output() onPress: EventEmitter<void> = new EventEmitter<void>(); // Evento para capturar o clique no card

  handleClick() {
    this.onPress.emit(); // Emite o evento quando o card é clicado
  }
}
