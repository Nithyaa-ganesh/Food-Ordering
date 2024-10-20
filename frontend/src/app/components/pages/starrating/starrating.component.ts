import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-starrating',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './starrating.component.html',
  styleUrls: ['./starrating.component.css']
})
export class StarratingComponent {
  @Input() rating: number = 0; // Initial rating value
  @Input() stars: number = 5;   // Total number of stars
  @Input() readonly: boolean = true;
  @Input() checkedColor: string = 'gold';  // Default checked color
  @Input() uncheckedColor: string = 'gray';
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>(); // Emit changes
 
   
  starsArray: number[] = [];

  ngOnInit() {
    this.starsArray = Array(this.stars).fill(0); // Create array for stars
  }

  rate(star: number): void {
    this.rating = star; // Update the rating
    this.ratingChange.emit(this.rating);
    console.log('Rating updated to:', this.rating);
     
  }
}

