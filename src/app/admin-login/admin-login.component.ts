import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor( private fb:FormBuilder,private router:Router){}

  email:string=""
  password:string=""
  adminemail:string="admin@gmail.com"
  adminpassword:string="1234"

  // form group
  loginForm = this.fb.group({
    email:[''],
    password:['']
  })

  // admin login
adminLogin(){
  if(this.loginForm.valid){
    this.email=this.loginForm.value.email||""
    this.password=this.loginForm.value.password||""
    if(this.password==this.adminpassword && this.email==this.adminemail){
      localStorage.setItem("email",this.email)
      localStorage.setItem("password",this.password)
      this.router.navigateByUrl('/admindashboard');
      console.log('redirect to admin DASHBOARD');
      
    }
    else{
      alert("invalid username or password")
    }
  }
  else
  {
    alert('please enter a valid information')
    console.log('please enter a valid information');
    
  }
}

}
