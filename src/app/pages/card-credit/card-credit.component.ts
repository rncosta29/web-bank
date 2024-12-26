import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../service/api.service'; // Serviço para obter dados
import { Card, DataItem } from '../../types/models'; // Modelos para Tipos de Dados

@Component({
  selector: 'app-card-credit',
  standalone: false,

  templateUrl: './card-credit.component.html',
  styleUrl: './card-credit.component.scss'
})
export class CardCreditComponent implements OnInit, OnChanges {

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
  months: number[] = [];
  years: number[] = [];

  constructor(
    private readonly fb: FormBuilder,
    public dialog: MatDialog,
    private readonly apiService: ApiService,
    private router: Router 
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
    this.months = Array.from({ length: 12 }, (_, i) => (i + 1));
    this.loadCards();
    this.loadAvailableYears();
    this.loadBills();
  }

  ngOnChanges(): void {
    this.selectMonth;
    this.selectYear;
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

      this.years = [
        ...new Set(bills.map((item: { paymentYear: any }) => item.paymentYear)),
      ]

      this.total = this.cardBills.reduce(
        (sum, item) => sum + parseFloat(item.price || '0'),
        0
      );
    });
  }

  loadAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (currentMonth === 1 && new Date().getDate() <= 10) {
      this.availableYears = [currentYear - 1, ...Array.from({ length: 5 }, (_, i) => currentYear + i)];
    } else {
      this.availableYears = Array.from({ length: 5 }, (_, i) => currentYear + i);
    }
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

  selectMonth(month: number): void {
    this.selectedMonth = month;
    console.log('Mês selecionado:', month);
    this.loadBills()
  }

  selectYear(year: number): void {
    this.selectedYear = year;
    console.log('Ano selecionado:', year);
    this.loadBills();
  }

  goBack(): void {
    // Lógica para navegar de volta, você pode usar router para navegar para a página inicial
    this.router.navigate(['/']);
    this.loadCards(); // Recarregar os cartões de crédito
    this.loadBills();  // Recarregar as faturas
  }
}
