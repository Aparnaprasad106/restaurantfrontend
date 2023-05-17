import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  public payPalConfig?: IPayPalConfig;


  allProducts:any=[]
  cartTotalPrice:number=0
  deliverycharge=0
  cartTotal=0
  username:string=''
  flat:string=''
  street:string=''
  state:string=''
  proceedtopaymentbtnstatus:boolean=false
  offerClickedstatus:boolean=false
  showSuccess:boolean=false
  showCancel:boolean=false
  showError:boolean=false
  showPaypal:boolean=false



// address
addressForm = this.fb.group({
  username:[''],
  flat:[''],
  street:[''],
  state:['']
})

  constructor(private api:ApiService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.api.getCart()
    .subscribe((result:any)=>{
      // 200
      console.log(result);
      this.allProducts=result
      this.getCartTotal()
       // paypal
    this.initConfig()
    },
    (result:any)=>{
      console.log(result.error);
      
    })
   
  }

  // get cart total
getCartTotal(){
  let total=0
  this.allProducts.forEach((item:any)=>{
    total += item.grantTotal
    this.cartTotalPrice = Math.ceil(total)
  })
}

// incrementquantity
incrementquantity(id:any){
  this.api.incrementQuantity(id)
  .subscribe((result:any)=>{
    console.log(result);
    this.allProducts=result
    this.getCartTotal()
    
  },
  (result:any)=>{
    console.log(result.error);
  })
}

// decrementquantity
decrementquantity(id:any){
  this.api.decrementQuantity(id)
  .subscribe((result:any)=>{
    this.allProducts=result
    this.getCartTotal()
  },
  (result:any)=>{
    console.log(result.error);
    
  })
}

// emptyCart
emptyCart(){
  this.api.emptycart()
  .subscribe((result:any)=>{
    console.log(result);
    this.allProducts=[]
    this.getCartTotal()
    
  },
  (result:any)=>{
    console.log(result);
    
  })
}

// removeItem
removeItem(id:any){
  this.api.removeItem(id)
  .subscribe((result:any)=>{
    this.allProducts=result
    this.getCartTotal()
  },
  (result:any)=>{
    console.log(result.error);
    
  })
}

// proceed to payment
SubmitBtn(){
  if(this.addressForm.valid){
    this.proceedtopaymentbtnstatus=true
    this.username=this.addressForm.value.username||""
    this.flat=this.addressForm.value.flat||""
    this.street=this.addressForm.value.street||""
    this.state=this.addressForm.value.state||""
    this.offerClicked()
    this.AddDeliveryDetails(this.username,this.flat,this.street,this.state)
  }
  else{
    alert('please enter valid inputs')
  } 
}
// offerclicked()
offerClicked(){
  this.offerClickedstatus=true
  if(this.cartTotalPrice<1000){
    this.deliverycharge=this.cartTotalPrice*10/100
    this.cartTotal=Math.ceil(this.cartTotalPrice + this.deliverycharge)
    this.cartTotalPrice = this.cartTotal
  }
}



// modelClose
modelClose(){
  this.addressForm.reset()
  this.showCancel= false
  this.showError = false
  this.showSuccess = false
  this.proceedtopaymentbtnstatus = false
  this.showPaypal = false
}

// makePayment
makePayment(){
  this.showPaypal = true
}


//Add delivery details
AddDeliveryDetails(username:any,flat:any,street:any,state:any){
  this.api.deliveryDetails(this.username,flat,street,state)
  .subscribe((result:any)=>{
    // 200
    console.log(result);
    
  },
  (result:any)=>{
    // 400
    console.log(result.error);
    
  })
} 


// paypal payment method
 private initConfig(): void {
  let amount = this.cartTotalPrice.toString()
      this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: amount
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: amount,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details:any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
        setTimeout(() => {
          this.emptyCart()
        }, 3000);
        // hide paypal  
        this.showPaypal = false
        this.showCancel=false
        this.showError=false
        this.proceedtopaymentbtnstatus=false
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel=true
      },
      onError: err => {
        console.log('OnError', err);
        this.showError=true
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
    }
  }
