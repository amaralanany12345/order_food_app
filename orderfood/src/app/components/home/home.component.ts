import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Cart } from 'src/app/cart';
import { Icategory } from 'src/app/icategory';
import { Ifoods } from 'src/app/ifoods';
import { Iuser } from 'src/app/iuser';
import { CategoriesService } from 'src/app/services/categories.service';
import { FoodServiceService } from 'src/app/services/food-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  user:Iuser={} as Iuser
  allFoods:Ifoods[]=[]
  customerCart:Cart={} as Cart
  food:Ifoods= {} as Ifoods
  allCustomerCart:Cart[]=[]
  diabledbuttonCard:boolean[]=[]
  selectedCatId:number=0

  allCatId:Icategory[]=[]
  constructor (private foodSerive:FoodServiceService,private router:Router,private categoryService:CategoriesService){}
  
  ngOnInit(){
    this.user=history.state.data
      this.foodSerive.getAllFoods().subscribe(foods=>{
        this.allFoods=foods
      })
      this.foodSerive.getCustomerCart(this.user.email).subscribe(allCustomerCart=>{
        this.allCustomerCart=allCustomerCart
      }) 
      this.categoryService.getAllCategories().subscribe(allCategories=>{
        this.allCatId=allCategories
      })
      }
    
    addToCart(itemId:number,itemIndex:number){

    this.customerCart.username=this.user.username
    this.customerCart.email=this.user.email
    this.customerCart.foods=this.allFoods[itemIndex]
    this.customerCart.id+=1
    this.foodSerive.addToCart(this.customerCart).subscribe(customerCart=>{
      this.customerCart=customerCart
    })
    this.foodSerive.getCustomerCart(this.user.email).subscribe(allCustomerCart=>{
      this.allCustomerCart=allCustomerCart
    })  
    
    this.diabledbuttonCard[itemIndex]=true
    this.router.events.subscribe(event=>{
      if (event instanceof NavigationStart) {
        // Check if the user is navigating away from the page
        if (event.url !== '/home') {
          this.diabledbuttonCard[itemIndex] = false;
        } else {
          this.diabledbuttonCard[itemIndex] = false;
        }
      }
    })
  }
  
  goToCart(){
    this.router.navigateByUrl('/cart',{state:{data:this.user}})
  } 

}
