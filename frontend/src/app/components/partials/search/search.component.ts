import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  constructor(private activatedRoute:ActivatedRoute,private router:Router) {
    this.activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) this.searchTerm = params.searchTerm;
    });
   }

  ngOnInit(): void {}

  search(term:string):void{
    console.log('search term :',term);
    if(term){
    this.router.navigate(['/search/'+ term]);
  }
}
}