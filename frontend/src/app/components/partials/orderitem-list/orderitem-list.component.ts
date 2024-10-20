import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderitem-list',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './orderitem-list.component.html',
  styleUrls: ['./orderitem-list.component.css']
})
export class OrderitemListComponent implements OnInit {
 @Input()
 order!:Order;
 constructor(){ }

 ngOnInit():void{

 }



}
