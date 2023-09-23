import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ifoods } from 'src/app/ifoods';
import { Iuser } from 'src/app/iuser';
import { FoodServiceService } from 'src/app/services/food-service.service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {
  allFoods:Ifoods[]=[]
  user:Iuser={} as Iuser
  constructor(private router:Router,private foodService:FoodServiceService){
    foodService.getAllFoods().subscribe(foods=>{
      this.allFoods=foods
    })
  }
  ngOnInit(): void {
    this.user=history.state.data
  }
  
  backToHome(){
    this.router.navigateByUrl('/home',{state:{data:this.user}})
  }

}
