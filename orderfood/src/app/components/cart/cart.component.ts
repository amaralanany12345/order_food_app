import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/cart';
import { Iuser } from 'src/app/iuser';
import { FoodServiceService } from 'src/app/services/food-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user:Iuser={} as Iuser
  customerCart:Cart[]=[]
  total:number=0
  constructor(private foodService:FoodServiceService,private router:Router){
  }

  ngOnInit(): void {
      this.user=history.state.data
      this.foodService.getCustomerCart(history.state.data.email).subscribe(customerCart=>{
      this.customerCart=customerCart
      for(let i=0;i<this.customerCart.length;i++){
        this.customerCart[i].quantity=1
        this.total+=customerCart[i].foods.price*this.customerCart[i].quantity
      }
    })
    }
handleInputChange(value: number,index:number) {
  if(value<=1){
    value=1
  }
  this.customerCart[index].quantity=value
  var total:number=0
  for(let i=0;i<this.customerCart.length;i++){
    total+=this.customerCart[i].foods.price*this.customerCart[i].quantity
  }

  this.total=total
}

applyOrder(){
  this.router.navigateByUrl('/cart/applyOrder',{state:{data:this.customerCart,user:this.user,total:this.total}})
}

delete(itemId:number,index:number){
  this.total-=this.customerCart[index].foods.price*this.customerCart[index].quantity

  this.customerCart.splice(index,1)
  this.foodService.deletteItem(itemId).subscribe(orders=>{
  })
}

}
