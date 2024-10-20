import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/models/Food';
import { StarratingComponent } from '../starrating/starrating.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [StarratingComponent, FormsModule, RouterModule, CommonModule, NotFoundComponent],
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  comments: string[] = []; // Array to store comments
  newComment: string = '';
  isFavorite: boolean = false;
  selectedSize: string = 'Medium'; // Default size
  priceBySize: number = 0; // Price based on selected size
  caloriesBySize: number = 0; // Calories based on selected size

  constructor(activatedRoute: ActivatedRoute, foodService: FoodService,
              private cartService: CartService, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.food = foodService.getFoodById(params.id);
        this.isFavorite = this.food.favorite;
        this.updatePriceAndCaloriesBySize();
      }
    });
  }

  ngOnInit(): void { }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push(this.newComment);
      this.newComment = '';
    }
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.food.favorite = this.isFavorite;
  }

  onStarRatingChange(newRating: number) {
    this.food.stars = newRating;
  }

  onSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement | null; // Safely cast with 'null' fallback
    if (target && target.value) {
      this.selectedSize = target.value; // Now you can access the 'value' safely
      this.updatePriceAndCaloriesBySize(); // Update price and calories when size changes
    }
  }

  updatePriceAndCaloriesBySize() {
    switch (this.selectedSize) {
      case 'Small':
        this.priceBySize = this.food.price - 40; // Adjust price for small size
        this.caloriesBySize = this.food.calories - 200; // Adjust calories for small size
        break;
      case 'Large':
        this.priceBySize = this.food.price + 60; // Adjust price for large size
        this.caloriesBySize = this.food.calories + 200; // Adjust calories for large size
        break;
      case 'Medium':
      default:
        this.priceBySize = this.food.price; // Default to medium price
        this.caloriesBySize = this.food.calories; // Default to medium calories
    }
  }
}
