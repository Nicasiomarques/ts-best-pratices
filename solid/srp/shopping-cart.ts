type CartItem = { name: string; price: number };
type OrderStatus = 'open' | 'closed';

class Messaging {
  sendMessage(msg: string): void {
    console.log('mensagem enviada: ', msg);
  }
}

class Persistency {
  saveOrder() {
    console.log('pedido salvo com sucesso...');
  }
}

class Order {
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

export class ShoppingCart {
  private _items: CartItem[] = [];

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number) {
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  total(): number {
    return +this._items
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2);
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  clear() {
    console.log('Carrinho de compras foi limpo');
    this._items.length = 0;
  }
}

const makeFactories = () => {
  const shoppingCart = new ShoppingCart();
  const persistency = new Persistency();
  const messaging = new Messaging();
  const order = new Order(shoppingCart, messaging, persistency);
  return {
    shoppingCart,
    order,
  };
};

const { shoppingCart, order } = makeFactories();

shoppingCart.addItem({ name: 'arroz', price: 129 });
shoppingCart.addItem({ name: 'papa', price: 432 });
shoppingCart.addItem({ name: 'feijao', price: 23 });

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
