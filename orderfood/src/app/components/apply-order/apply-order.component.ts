import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/cart';
import { Ifoods } from 'src/app/ifoods';
import { Iuser } from 'src/app/iuser';
import { Orders } from 'src/app/orders';
import { FoodServiceService } from 'src/app/services/food-service.service';

@Component({
  selector: 'app-apply-order',
  templateUrl: './apply-order.component.html',
  styleUrls: ['./apply-order.component.css']
})

export class ApplyOrderComponent implements OnInit {
  personalInfoForm!:FormGroup
  newOrder:Orders={} as Orders
  user:Iuser={} as Iuser
  customerCart:Cart[]=[]
  x:Ifoods[]=[]
  currentDate=new Date
  constructor(private formBuilder:FormBuilder,private foodService:FoodServiceService,private router:Router){}
  
  ngOnInit(): void {
    this.user=history.state.user
    this.personalInfoForm=this.formBuilder.group({
      number:['',Validators.required],
      address:['',Validators.required]
    })
    this.customerCart=history.state.data    
  }

  apply(){
    this.newOrder.email=this.user.email
    this.newOrder.customerNumber=this.personalInfoForm.value.number
    this.newOrder.address=this.personalInfoForm.value.address
    this.newOrder.total=history.state.total
    this.newOrder.history=this.currentDate
    this.newOrder.customerCart=this.x
    for(let i=0;i<this.customerCart.length;i++){
      this.customerCart[i].foods.quantity=this.customerCart[i].quantity
      this.newOrder.customerCart.push(this.customerCart[i].foods)
    }
    this.foodService.applyOrder(this.newOrder).subscribe(order=>{
      this.newOrder=order
    })
    this.foodService.getCustomerCart(this.user.email).subscribe(newCustomerCart=>{
    })
    this.router.navigateByUrl('cart/applyOrder/thanks',{state:{data:this.user}})
  }

}
