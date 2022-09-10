import { ShoppingCart, Order } from './entities';
import { Messaging, Persistency } from './infra';

const shoppingCart = new ShoppingCart();
const persistency = new Persistency();
const messaging = new Messaging();
const order = new Order(shoppingCart, messaging, persistency);

shoppingCart.addItem({ name: 'arroz', price: 129 });
shoppingCart.addItem({ name: 'papa', price: 432 });
shoppingCart.addItem({ name: 'feijao', price: 23 });

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
