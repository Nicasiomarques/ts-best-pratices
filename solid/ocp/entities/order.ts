import { OrderStatus } from '../contracts';
import { Messaging, Persistency } from '../infra';
import { ShoppingCart } from '../entities';

export class Order {
  private _status: OrderStatus = 'open';
  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency
  ) {}

  get orderStatus() {
    return this._status;
  }

  checkout() {
    if (this.cart.isEmpty()) {
      console.log('O carro esta vazio!');
      return;
    }
    this._status = 'closed';
    this.messaging.sendMessage(
      `Seu pedido com total de ${this.cart.total()} foi enviado com sucesso!`
    );
    this.persistency.saveOrder();
    this.cart.clear();
  }
}
