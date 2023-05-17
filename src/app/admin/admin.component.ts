import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  ReservationDetails:any=[]
  DeliveryDetails:any=[]
  deliverydetailstatus:boolean=false

 category = document.getElementById('category')
 addformstatus:boolean=false
 editformstatus:boolean=false

 // Reactive Form-AddForm
  addForm = this.fb.group({
    id:['',[Validators.required]],
    category:['',[Validators.required]],
    title:['',[Validators.required]],
    image:['',[Validators.required]],
    price:['',[Validators.required]]
  })

   // EditForm Form-EditForm
   editForm = this.fb.group({
    id:['',[Validators.required]],
    category:['',[Validators.required]],
    title:['',[Validators.required]],
    image:['',[Validators.required]],
    price:['',[Validators.required]]
  })


  constructor(private fb:FormBuilder,private api:ApiService,private adminrouter:Router){}
ngOnInit(): void {
  this.viewReservation()
  if(!localStorage.getItem('email')){
    alert('Plese Login')
    this.adminrouter.navigateByUrl('adminlogin')
  }
}

addnew(){
  if(this.addForm.valid){
    let id = this.addForm.value.id
    let category = this.addForm.value.category
    let title = this.addForm.value.title
    let image = this.addForm.value.image
    let price = this.addForm.value.price
    console.log(id,category,title,image,price);
    

    // to make api call
    this.api.addNew(id,category,title,image,price)
    .subscribe((result:any)=>{
      // 200
      console.log(result);
      alert("New Item Added Successfully")
      this.addForm.reset()      
    },
    (result:any)=>{
      // 400
      console.log(result.error);
      
    }
    )
  }
  else{
    alert('invalid form')
  }
}

NewDish(){
  this.addformstatus=true
  this.editformstatus=false
}
EditDish(){
  this.editformstatus=true
  this.addformstatus=false
}
// edit item
editItem(){
  if(this.editForm.valid){
    let id = this.editForm.value.id
    let category = this.editForm.value.category
    let title = this.editForm.value.title
    let image = this.editForm.value.image
    let price = this.editForm.value.price
    
    // make api call to edit
    this.api.editItem(id,category,title,image,price)
    .subscribe((result:any)=>{
      // 200
      console.log(result);
      alert('Item Updated Successfully')
      this.editForm.reset()
      
    },
    (result:any)=>{
      // 400
      console.log(result.error);
      
    }
    )

  }
  else
  {
    alert('invalid form')
  }
}

// api call to view reservation
 viewReservation(){
  this.api.viewReservation()
  .subscribe((result:any)=>{
    console.log(result);
    this.ReservationDetails=result
    
  },
  (result:any)=>{
    console.log(result.error);
    
  })
 }

//  api call to delete reservation details
removeReservation(phone: any) {
  console.log(phone);
  this.api.removeReservation(phone).subscribe(
    (data) => {
      console.log(data);
      this.ReservationDetails = data;
    },
    (error) => {
      console.log(error);
    }
  );
}

// view delivery details
viewdeliverydetails(){
  this.api.viewDeliverydetails()
  .subscribe((result:any)=>{
    // 200
    console.log(result);
    this.DeliveryDetails = result
    this.deliverydetailstatus = true
    this.editformstatus=false
    this.addformstatus=false
    
  },
  (result:any)=>{
    console.log(result.error);
    
  })
}

// removeDelivery
removeDelivery(username:any){
  this.api.removedeliveryDetails(username)
  .subscribe((result:any)=>{
    console.log(result);
    this.DeliveryDetails = result
  },
  (result:any)=>{
    console.log(result.error);
    
  })
}

// logout
logout(){
  localStorage.removeItem('email')
  localStorage.removeItem('password')
  this.adminrouter.navigateByUrl('')
}


}
