// types.ts

// Tipo que representa um item de dados de fatura de cartão de crédito
export interface DataItem {
[x: string]:
// Tipo que representa um item de dados de fatura de cartão de crédito
any;
  cardId: number;
  id: number;
  name: string;
  date: string;
  price: string;
  creditCardDto: number;
  creditCardId: number;  // A propriedade cardId provavelmente é essa
  isParcel: boolean;
  paymentMonth: number;
  paymentYear: number;
}

// Tipo que representa um cartão de crédito com múltiplos itens de faturas
export interface Card {
  id: number;
  name: string;
  creditsCardDto: DataItem[];
}

// Tipo que representa a estrutura para enviar novas faturas
export interface SendNewBills {
  name: string;
  date: string;
  price: string;
  creditCardId: number;
  isParcel: boolean;
  paymentMonth: number;
  paymentYear: number;
  quantity: number;
}
