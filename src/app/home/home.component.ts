import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {




  reservationForm = this.fb.group({
    name:['',[Validators.required]],
    phone:['',[Validators.required,Validators.pattern('[0-9]*')]],
    date:['',[Validators.required]],
    peoples:['',[Validators.required]],
    request:['',[Validators.required]]
  })
constructor(private fb:FormBuilder,private api:ApiService,private router:Router){}

reservation(){
  if(this.reservationForm.valid){
    let name=this.reservationForm.value.name
    let phone=this.reservationForm.value.phone
    let date=this.reservationForm.value.date
    let peoples=this.reservationForm.value.peoples
    let request=this.reservationForm.value.request

    // make api call to add reservation Details
    this.api.addReservation(name,phone,date,peoples,request)
    .subscribe((result:any)=>{
      // 200
      console.log(result);
      alert('Reservation Completed Succesfully')
      this.router.navigateByUrl(`reservation/${phone}`)
      this.reservationForm.reset()
      
    },(result:any)=>{
      // 400
      console.log(result.error);
      
    })
  }
  else
  alert('invalid form')
}

// viewDishes
viewDishes(name:any)
{
this.api.viewDishes(name)
.subscribe((result:any)=>{
  console.log(result);
  this.api.resultArray=result 
  this.router.navigateByUrl('/dishview' )
  console.log('redirect to dishviews');
  
},
(result:any)=>{
  console.log(result.error);

})
}

}
