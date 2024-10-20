import { Food } from './Food'; // Ensure the path is correct

export class CartItem {
  quantity: number = 1;
  price: number;

  constructor(public food: Food) {
    // Now 'food' is initialized, so you can access 'food.price'
    this.price = food.price;
  }
  get name(): string {
    return this.food.name; // Assuming 'Food' class has a 'name' property
  }
}
