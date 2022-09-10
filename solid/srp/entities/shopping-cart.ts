import { CartItem } from '../contracts';

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
