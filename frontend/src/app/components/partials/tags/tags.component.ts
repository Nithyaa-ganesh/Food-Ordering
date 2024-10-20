import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Tag } from '../../../shared/models/Tag';
import { Food } from '../../../shared/models/Food';
import { CommonModule } from '@angular/common';

@Component({ 
  selector: 'app-tags',
  standalone: true,
  imports:[RouterModule,CommonModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags?: Tag[];
  

  constructor(private foodService: FoodService) {

    this.tags=foodService.getAllTags();
  }

  ngOnInit(): void {

  }
}