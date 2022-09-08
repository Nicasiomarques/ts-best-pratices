type CartItem = { name: string; price: number };
type OrderStatus = 'open' | 'closed';

export class ShoppingCart {
  private _items: CartItem[] = [];
  private _status: OrderStatus = 'open';

  public addItem(item: CartItem): void {
    this._items.push(item);
  }

  public removeItem(index: number) {
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  get orderStatus() {
    return this._status;
  }

  public total(): number {
    return +this._items
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2);
  }

  public checkout() {
    if (this.isEmpty()) {
      console.log('O carro esta vazio!');
      return;
    }
    this._status = 'closed';
    this.sendMessage(
      `Seu pedido com total de ${this.total()} foi enviado com sucesso!`
    );
    this.saveOrder();
    this.clear();
  }

  public isEmpty(): boolean {
    return this._items.length === 0;
  }

  public sendMessage(msg: string) {
    console.log('mensagem enviada: ', msg);
  }

  public saveOrder() {
    console.log('pedido salvo com sucesso...');
  }

  public clear() {
    console.log('Carrinho de compras foi limpo');
    this._items.length = 0;
  }
}

const shoppingCart = new ShoppingCart();
shoppingCart.addItem({ name: 'arroz', price: 129 });
shoppingCart.addItem({ name: 'papa', price: 432 });
shoppingCart.addItem({ name: 'feijao', price: 23 });

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.orderStatus);
shoppingCart.checkout();
console.log(shoppingCart.orderStatus);
