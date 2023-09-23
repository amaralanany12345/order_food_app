import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/iuser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent  {
  constructor(private formbuilder: FormBuilder,private userSerivice:UserService,private router:Router){}
  users:Iuser[]=[]
  loginForm!:FormGroup
  isloggedIn:boolean=false
    ngOnInit(){

      this.loginForm=this.formbuilder.group({
        Email:['',Validators.required],
        password:['',Validators.required]
      })
    }

    login(){
      this.userSerivice.logIn().subscribe(res=>{
        let users=res.find((user:any)=>{
          return user.email===this.loginForm.value.Email && user.password===this.loginForm.value.password
        })
        if(users){
          this.router.navigateByUrl('home',{state:{data:users}})
        }
        else{
          this.isloggedIn=true
        }
      })
    }
}
