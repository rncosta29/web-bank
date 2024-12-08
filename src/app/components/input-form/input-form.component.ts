import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface SendNewBills {
  name: string;
  date: string;
  price: string;
  creditCardId: number;
  isParcel: boolean;
  paymentMonth: number;
  paymentYear: number;
  quantity?: number;
}

@Component({
  selector: 'app-input-form',
  standalone: false,

  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss'
})
export class InputFormComponent implements OnInit {

  @Input() selectedCardId: number = 0; // ID do cartão selecionado
  @Output() onSubmit: EventEmitter<SendNewBills> = new EventEmitter(); // Evento de envio do formulário
  @Output() setAdd: EventEmitter<boolean> = new EventEmitter<boolean>(); // Controla a visibilidade do formulário

  form!: FormGroup;
  selectedMonth: string | undefined = undefined;
  selectedYear: string | undefined = undefined;

  meses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  anos: number[] = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      date: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      creditCardId: [this.selectedCardId, Validators.required],
      isParcel: [false],
      paymentMonth: ['', Validators.required],
      paymentYear: ['', Validators.required],
      quantity: ['', [Validators.min(2)]]
    });
  }

  handleDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let formattedDate = input.value.replace(/\D/g, '').slice(0, 8);
    if (formattedDate.length >= 3) formattedDate = `${formattedDate.slice(0, 2)}/${formattedDate.slice(2)}`;
    if (formattedDate.length >= 6) formattedDate = `${formattedDate.slice(0, 5)}/${formattedDate.slice(5)}`;
    this.form.get('date')?.setValue(formattedDate);
  }

  convertDateToISO(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  handleSubmit(): void {
    if (this.form.invalid) {
      console.log('Erro de validação:', this.form.errors);
      return;
    }

    const formattedDate = this.convertDateToISO(this.form.get('date')?.value);
    const paymentMonth = parseInt(this.selectedMonth || '0', 10);
    const paymentYear = parseInt(this.selectedYear || '0', 10);

    const dataToSend: SendNewBills = {
      ...this.form.value,
      date: formattedDate,
      paymentMonth,
      paymentYear,
      quantity: this.form.get('isParcel')?.value ? this.form.get('quantity')?.value : 1
    };

    this.onSubmit.emit(dataToSend);
    this.setAdd.emit(false); // Fecha o formulário
  }
}
