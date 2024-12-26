import { Component, OnInit,  SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ApiService } from '../../service/api.service';
import { Card } from '../../types/models';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Salaries {
  SALARIO15: string;
  SALARIO30: string;
  SALDOATUAL: string;
}

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  somarSaldo15: any;
  somarSaldo30: any;
  saldoTotal: any;

  constructor(private readonly apiService: ApiService, private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      somarSaldo15: [false],
      somarSaldo30: [false],
    });
  }

  salaries: Salaries = {
    SALARIO15: '5488.00',
    SALARIO30: '4722.32',
    SALDOATUAL: '0.00'
  };

  cards: Card[] = [];
  totalsByMonth: Record<number, number> = {};
  totalSalaries: number = 0;
  finalDifference: number = 0;
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  total: number = 0;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.initializeData();
    this.updateTotalSalaries();
    this.updateFinalDifference();

    // Subscrição dos valores do formulário para reagir a mudanças
    this.form.valueChanges.subscribe((values) => {
      this.somarSaldo15 = values.somarSaldo15;
      this.somarSaldo30 = values.somarSaldo30;
      this.updateTotalSalaries();
      this.updateFinalDifference();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['somarSaldo15'] || changes['somarSaldo30'] || changes['saldoTotal']) {
      this.updateTotalSalaries();
      this.updateFinalDifference();
    }
  }

  updateTotalSalaries(): void {
    let total = parseFloat(this.salaries.SALDOATUAL);
    if (this.somarSaldo15) total += parseFloat(this.salaries.SALARIO15);
    if (this.somarSaldo30) total += parseFloat(this.salaries.SALARIO30);
    this.totalSalaries = total;
  }

  updateFinalDifference(): void {
    // Subtrai o total de salários pelo total por cartão
    this.finalDifference = this.totalSalaries - this.total;
  }

  initializeData(): void {
    this.isLoading = true;
    this.apiService.getAllCreditCards().subscribe(
      (data) => {
        this.cards = data;
        this.isLoading = false;
        // Após carregar os cartões, calcular os totais por cartão
        this.loadBillsByCard(this.selectedYear, this.selectedMonth);
      },
      (error) => {
        console.error('Erro ao carregar cartões:', error);
        this.isLoading = false;
      }
    );
  }

  handleMonthChange(month: number) {
    const currentYear = new Date().getFullYear();
    const yearToUse = month <= new Date().getMonth() ? currentYear + 1 : currentYear;

    this.selectedMonth = month;
    this.selectedYear = yearToUse;
    this.loadBillsByCard(yearToUse, month);
  }

  async loadBillsByCard(year: number, month: number) {
    if (!year || !month || this.cards.length === 0) return;

    try {
      const totalsMap = this.cards.reduce((acc, card) => {
        const cardTotal = (card.creditsCardDto || [])
          .filter((item) => item.paymentMonth === month && item.paymentYear === year)
          .reduce((sum, item) => sum + parseFloat(item.price || '0'), 0);
        acc[card.id] = cardTotal;
        return acc;
      }, {} as Record<number, number>);

      const grandTotal = Object.values(totalsMap).reduce((sum, value) => sum + value, 0);

      this.totalsByMonth = totalsMap;
      this.total = grandTotal;
      this.updateFinalDifference(); // Atualiza a diferença final após calcular os totais dos cartões
    } catch (error) {
      console.error('Erro ao carregar faturas:', error);
    }
  }

  getNextMonths() {
    const months = [
      { name: 'Jan', index: 1 },
      { name: 'Feb', index: 2 },
      { name: 'Mar', index: 3 },
      { name: 'Apr', index: 4 },
      { name: 'May', index: 5 },
      { name: 'Jun', index: 6 },
      { name: 'Jul', index: 7 },
      { name: 'Aug', index: 8 },
      { name: 'Sep', index: 9 },
      { name: 'Oct', index: 10 },
      { name: 'Nov', index: 11 },
      { name: 'Dec', index: 12 },
    ];

    const currentMonth = new Date().getMonth();
    return [
      months[currentMonth],
      months[(currentMonth + 1) % 12],
      months[(currentMonth + 2) % 12],
      months[(currentMonth + 3) % 12],
      months[(currentMonth + 4) % 12],
    ];
  }

  toggleSaldo15(event: MatCheckboxChange) {
    this.form.patchValue({ somarSaldo15: event.checked });
  }

  toggleSaldo30(event: MatCheckboxChange) {
    this.form.patchValue({ somarSaldo30: event.checked });
  }

}
