import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/iuser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  newUser:Iuser={} as Iuser
constructor(private userService:UserService,private router:Router){

}
signUp(){
  this.userService.signUp(this.newUser).subscribe(newuser=>{
  })
  this.router.navigateByUrl('/home',{state:{data:this.newUser}})
}
}
