import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent{
  @ViewChild('topElement') topElement!: ElementRef;

  searchTerm:string=""
  constructor(private api:ApiService){ }
  resultArray=this.api.resultArray 
  

  // add to cart
addtocart(dish:any){
  // add {quantity:1} to dish object
  Object.assign(dish,{quantity:1})
  console.log(dish);
  
  // api
  this.api.addtocart(dish.id,dish.title,dish.image,dish.price,dish.quantity)
  .subscribe((result:any)=>{
    // 200
    // call cartcount
    // this.api.cartCount()
    alert(result)
  },
  // 400
  (result:any)=>{
    alert(result.error)
  }
  )
}
}
