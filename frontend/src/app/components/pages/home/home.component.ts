import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { StarratingComponent } from '../starrating/starrating.component';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule,StarratingComponent,SearchComponent,TagsComponent,NotFoundComponent], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  foods: Food[] = [];
  constructor(private foodService: FoodService,activatedRoute:ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      console.log(params); 

       if(params.searchTerm)
       this.foods =this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
       else if(params.tag)
        this.foods = this.foodService.getAllFoodsByTag(params.tag);
       else
        this.foods=foodService.getAll();

    })
     
    
    }
      
    
  ngOnInit(): void {}
  toggleFavorite(food: Food) {
    food.favorite = !food.favorite; // Toggle the favorite state of the food item
  }
  updateRating(food: Food, newRating: number) {
    food.stars = newRating; // Update the rating of the food item
  }
  

}
