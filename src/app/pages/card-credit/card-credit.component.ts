import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../service/api.service'; // Serviço para obter dados
import { Card, DataItem } from '../../types/models'; // Modelos para Tipos de Dados

@Component({
  selector: 'app-card-credit',
  standalone: false,

  templateUrl: './card-credit.component.html',
  styleUrl: './card-credit.component.scss'
})
export class CardCreditComponent implements OnInit {

  cards: Card[] = [];
  cardBills: DataItem[] = [];
  total: number = 0;
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  availableYears: number[] = [];
  availableMonths: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selectedCardId: number = 1;
  addForm: FormGroup;
  add: boolean = false;
  isInstallments: boolean = false;
  installmentsCount!: number;

  constructor(
    private readonly fb: FormBuilder,
    public dialog: MatDialog,
    private readonly apiService: ApiService
  ) {
    this.addForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      selectedMonth: [this.selectedMonth, Validators.required],
      selectedYear: [this.selectedYear, Validators.required],
      isInstallments: [false],
      installmentsCount: ['', [Validators.min(1), Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit(): void {
    this.loadCards();
    this.loadAvailableYears();
  }

  // Carregar cartões de crédito
  loadCards(): void {
    this.apiService.getAllCreditCards().subscribe(data => {
      this.cards = data;
    });
  }

  // Carregar faturas de acordo com o ano, mês e cartão selecionado
  loadBills(): void {
    if (!this.selectedCardId) return;

    this.apiService.getAllBillsByCreditCard(this.selectedCardId).subscribe(bills => {
      this.cardBills = bills;
      this.cardBills = bills.filter(
        (item) => item.paymentYear === this.selectedYear && item.paymentMonth === this.selectedMonth
      );

      this.total = this.cardBills.reduce(
        (sum, item) => sum + parseFloat(item.price || '0'),
        0
      );
    });
  }

  loadAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    this.availableYears = Array.from({ length: 5 }, (_, i) => currentYear + i);
  }

  onCardSelect(cardId: number): void {
    this.selectedCardId = cardId;
    this.loadBills(); // Carregar faturas do cartão selecionado
  }

  onInstallmentsChange(): void {
    this.isInstallments = this.addForm.get('isInstallments')?.value; // O operador '?' garante que 'get' não retorne null ou undefined
    const installmentsCountControl = this.addForm.get('installmentsCount');

    if (installmentsCountControl) {
      if (!this.isInstallments) {
        installmentsCountControl.setValue(0); // Define como 0 quando não for parcelado
      } else {
        // Se for parcelado, talvez você queira adicionar algum valor ou lógica aqui
        // Exemplo: installmentsCountControl.setValue(null); para resetar o campo, caso necessário
      }
    }
  }



  onSubmit(): void {
    console.log('Form Data: ', this.addForm.value);
    this.add = false;
    // Enviar os dados do formulário para o backend (Exemplo)
    // this.cardService.addTransaction(this.addForm.value).subscribe(response => { ... });
  }

  openAddDialog(): void {
    this.add = true;
  }

  closeAddDialog(): void {
    this.add = false;
  }
}
