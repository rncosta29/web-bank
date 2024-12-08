import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; // Importe o componente Home
import { CardCreditComponent } from './pages/card-credit/card-credit.component'; // Importe o componente CreditCard

// Defina as rotas para as páginas
const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota para a página inicial (home)
  { path: 'credit-card', component: CardCreditComponent }, // Rota para a página de cartões de crédito
  { path: '**', redirectTo: '' } // Redireciona para home caso a rota não seja encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configure as rotas
  exports: [RouterModule] // Exporte o RouterModule para usá-lo no AppModule
})
export class AppRoutingModule { }
