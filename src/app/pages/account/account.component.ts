import { ApiAccountService } from './../../service/api-account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PersonalAccount, DebitAccount } from '../../types/models';

@Component({
  selector: 'app-account',
  standalone: false,

  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  data = [
    { estabelecimento: 'Loja A', data: '2024-12-20', price: 150.5 },
    { estabelecimento: 'Loja B', data: '2024-12-21', price: 80.75 },
    { estabelecimento: 'Loja A', data: '2024-12-20', price: 150.5 },
    { estabelecimento: 'Loja B', data: '2024-12-21', price: 80.75 },
    { estabelecimento: 'Loja A', data: '2024-12-20', price: 150.5 },
    { estabelecimento: 'Loja B', data: '2024-12-21', price: 80.75 },
    { estabelecimento: 'Loja A', data: '2024-12-20', price: 150.5 },
    { estabelecimento: 'Loja B', data: '2024-12-21', price: 80.75 },
    { estabelecimento: 'Loja A', data: '2024-12-20', price: 150.5 },
    { estabelecimento: 'Loja B', data: '2024-12-21', price: 80.75 },
    { estabelecimento: 'Loja A', data: '2024-12-20', price: 150.5 },
    { estabelecimento: 'Loja B', data: '2024-12-21', price: 80.75 },
    { estabelecimento: 'Loja A', data: '2024-12-20', price: 150.5 },
    { estabelecimento: 'Loja B', data: '2024-12-21', price: 80.75 },
    { estabelecimento: 'Loja A', data: '2024-12-20', price: 150.5 },
    { estabelecimento: 'Loja B', data: '2024-12-21', price: 80.75 },
    { estabelecimento: 'Loja A', data: '2024-12-20', price: 150.5 },
    { estabelecimento: 'Loja B', data: '2024-12-21', price: 80.75 },
    { estabelecimento: 'Loja A', data: '2024-12-20', price: 150.5 },
    { estabelecimento: 'Loja B', data: '2024-12-21', price: 80.75 },
    { estabelecimento: 'Loja A', data: '2024-12-20', price: 150.5 },
    { estabelecimento: 'Loja B', data: '2024-12-21', price: 80.75 },
    { estabelecimento: 'Loja A', data: '2024-12-20', price: 150.5 },
    { estabelecimento: 'Loja B', data: '2024-12-21', price: 80.75 },
  ];
  personalAccount: PersonalAccount | undefined;
  debitAccount: DebitAccount[] = []
  saldoTotal = this.calculateSaldoTotal();

  // Reactive Form
  accountForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private readonly apiService: ApiAccountService) {
    this.accountForm = this.fb.group({
      estabelecimento: ['', Validators.required],
      data: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // loadCards() {
  //   this.apiService.getAllDebits(1).subscribe((data) => {
  //     this.personalAccount = data
  //   })
  // }

  // Adicionar novo item à lista
  addData() {
    if (this.accountForm.valid) {
      const newItem = this.accountForm.value;
      this.data.push(newItem); // Adiciona à lista
      this.saldoTotal = this.calculateSaldoTotal(); // Atualiza o saldo total
      this.accountForm.reset(); // Limpa o formulário
    }
  }

  // Calcular o saldo total
  private calculateSaldoTotal(): number {
    return this.data.reduce((acc, item) => acc + item.price, 0);
  }

  // Editar item
  editItem(index: number) {
    const item = this.data[index];
    this.accountForm.setValue({
      estabelecimento: item.estabelecimento,
      data: item.data,
      price: item.price,
    });

    // Remove o item da lista para que seja adicionado novamente ao salvar
    this.deleteItem(index);
  }

  // Excluir item
  deleteItem(index: number) {
    this.data.splice(index, 1);
    this.saldoTotal = this.calculateSaldoTotal();
  }

  goBack(): void {
    // Lógica para navegar de volta, você pode usar router para navegar para a página inicial
    this.router.navigate(['/']);
  }
}
