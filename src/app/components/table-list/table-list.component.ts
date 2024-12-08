import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-list',
  standalone: false,

  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss'
})
export class TableListComponent {

  @Input() name!: string;
  @Input() date!: string;
  @Input() price!: number;
  @Output() onDelete = new EventEmitter<void>();

  handleDelete() {
    this.onDelete.emit();
  }
}
