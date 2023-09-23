import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { LandPageComponent } from './components/land-page/land-page.component';
import { ApplyOrderComponent } from './components/apply-order/apply-order.component';
import { ThanksComponent } from './components/thanks/thanks.component';

const routes: Routes = [
  {path:'',component:LandPageComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:SigninComponent},
  {path:'logup',component:SignupComponent},
  {path:'cart',component:CartComponent},
  {path:'cart/applyOrder',component:ApplyOrderComponent},
  {path:'cart/applyOrder/thanks',component:ThanksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
