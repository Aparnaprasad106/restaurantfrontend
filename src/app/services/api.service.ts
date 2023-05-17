import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL= 'https://restaurant-mn8q.onrender.com'

  resultArray:any=[]

  constructor(private http:HttpClient) { }
  

  // apicall to add new item
  addNew(id:any,category:any,title:any,image:any,price:any){
    const body = {
      id,
      category,
      title,
      image,
      price
    }
  
    // make api call-item/add-item
    return this.http.post(`${this.BASE_URL}/item/add-item`,body)
  }

  // api call to edit item
  editItem(id:any,category:any,title:any,image:any,price:any){
    const body={id,category,title,image,price}
    // make api call
    return this.http.post(`${this.BASE_URL}/item/edit-item`,body)
  }

  // add reservation
  addReservation(name:any,phone:any,date:any,peoples:any,request:any){
    const body={name,phone,date,peoples,request}
    // make api call
    return this.http.post(`${this.BASE_URL}/item/reservation`,body)
  }

  // VIEW reservation
  viewReservation(){
    return this.http.get(`${this.BASE_URL}/item/view-reservation`)
  }

  // romove reservation
  removeReservation(phone:any) {
    console.log(phone);
    return this.http.delete(`${this.BASE_URL}/reservation/cancel/${phone}`);
  }
  
  // view dishes
  viewDishes(name:any){
    return this.http.get(`${this.BASE_URL}/item/view-item/${name}`)
  }

  // add to cart
  addtocart(id:any,title:any,image:any,price:any,quantity:any){
    const body = {id,title,image,price,quantity}
    return this.http.post(`${this.BASE_URL}/cart/add-item`,body)
  }

  // get cart items
  getCart(){
    return this.http.get(`${this.BASE_URL}/cart/get-item`)
  }
  
  // increment quantity
  incrementQuantity(id:any){    
    return this.http.get(`${this.BASE_URL}/cart/increment-quantity/${id}`)
  }

  // decrement quantity
  decrementQuantity(id:any){
    return this.http.get(`${this.BASE_URL}/cart/decrement-item/${id}`)
  }

  // empty cart
  emptycart(){
    return this.http.delete(`${this.BASE_URL}/cart/empty`)
  }

  // remove particular item from cart
  removeItem(id:any){
    return this.http.delete(`${this.BASE_URL}/cart/remove-item/${id}`)
  }

  // Reservation Details
  reservationDetails(phone:any){
    return this.http.get(`${this.BASE_URL}/reservation/display/${phone}`)
  }

  //Add Delivery details 
  deliveryDetails(username:any,flat:any,street:any,state:any){
    const body = {username,flat,street,state}
    return this.http.post(`${this.BASE_URL}/delivery/add-details`,body)
  }

  // view delivery details
  viewDeliverydetails(){
    return this.http.get(`${this.BASE_URL}/delivery/view-delivery`)
  }

  // reomove delivery detasils
  removedeliveryDetails(username:any)
  {
   return  this.http.delete(`${this.BASE_URL}/delivery/remove/${username}`)
  }
}
