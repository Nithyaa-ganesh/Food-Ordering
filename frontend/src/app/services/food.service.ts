import { Injectable } from '@angular/core';
import { sample_foods,sample_tags } from '../../data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foods: Food[] = sample_foods; // This holds the current state of foods
  private foodsSubject = new BehaviorSubject<Food[]>(this.foods);

  constructor() { }

  getAll(): Food[] {
    return sample_foods;
  
  }

  getAllFoodsBySearchTerm(searchTerm: string):Food[]{
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }
      

  getAllTags(): Tag[] {
    return sample_tags;
    
  }

  getAllFoodsByTag(tag: string): Food[] {
    return tag === "All" ? 
      this.getAll() :
      this.getAll().filter(food=>food.tags?.includes(tag));
      
  }

  getFoodById(foodId: string): Food {
    return this.getAll().find(food =>food.id==foodId)?? new Food();
    
}


 
updateStarRating(foodId: string, newRating: number): void {
  const food = this.getAll().find(food => food.id == foodId);
  if (food) {
    food.stars = newRating; // Update the star rating
  }
}
getFoodsObservable() {
  return this.foodsSubject.asObservable(); // Observable to get food updates
}

}
