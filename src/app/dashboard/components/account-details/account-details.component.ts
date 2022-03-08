import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  constructor(private fb:FormBuilder , private dashService:DashboardService) { }
  accountDetailsForm = this.fb.group({
    name: [
      '',
      [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]
    ],
    email: ['', [Validators.required, Validators.email]],
    // password: ['', [Validators.required, Validators.minLength(4)]],
    address: this.fb.group({
      street: ['',Validators.required],
      city: ['' ,Validators.required],
    }),
    phone: ['', [Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
  });
  
  submitDisabled:boolean = false

  name:string='';
  email:string='';
  // password:string='';
  street:string='';
  city:string='';
  phone:string='0';

ngOnInit(): void {
  this.dashService.getUserID()
  this.accountOverview()

//  this.accountDetailsForm.value.name      = this.name 
//  this.accountDetailsForm.value.email     = this.email 
//  this.accountDetailsForm.value.street    = this.street 
//  this.accountDetailsForm.value.city      = this.city 
//  this.accountDetailsForm.value.phone     = this.phone 

}

getErrors(field: string) {
  return this.accountDetailsForm.get(field)?.errors;
}
getField(field: string) {
  return this.accountDetailsForm.get(field);
}



accountOverview(){
  
  this.dashService.getUser(this.dashService.userID).subscribe({
    next:(res)=>{

    
      this.street = res.user.address.street
      this.city = res.user.address.city
      // we add the += as the 0 is not included so we intialize the 
      // the phone variable with 0 and then add the actual number on it
      this.phone += (res.user.phone).toString() 
      this.name = res.user.name
      this.email = res.user.email

      // this.accountDetailsForm.value.name   = res.user.name
      // this.accountDetailsForm.value.email  = res.user.email
      // this.accountDetailsForm.value.street = res.user.address.street
      // this.accountDetailsForm.value.city   = res.user.address.city
      // this.accountDetailsForm.value.phone  += (res.user.phone).toString() 
      },
    error:(err:any)=> {console.log( err.error.msg)}
    
  })
}
onInputChange(){
  console.log('on input chnage function')
  // this.submitDisabled = false
}
onSubmit(){

      if(this.accountDetailsForm.get('name')?.dirty ){
        console.log('hi name is changed')
        this.name = this.accountDetailsForm.value.name
      }else{
        this.accountDetailsForm.value.name = this.name
      }

      if(this.accountDetailsForm.get('email')?.dirty ){
        console.log('hi email is changed')
        this.email = this.accountDetailsForm.value.email
      }else{
        this.accountDetailsForm.value.email = this.email
      }

      if(this.accountDetailsForm.get('phone')?.dirty ){
        console.log('hi phone is changed')
        this.phone = this.accountDetailsForm.value.phone
      }else{
        this.accountDetailsForm.value.phone = this.phone
      }

      if(this.accountDetailsForm.get('street')?.dirty ){
        console.log('hi street is changed')
        this.street = this.accountDetailsForm.value.street
      }else{
        this.accountDetailsForm.value.street = this.street
      }

      if(this.accountDetailsForm.get('city')?.dirty ){
        console.log('hi city is changed')
        this.city = this.accountDetailsForm.value.city
      }else{
        this.accountDetailsForm.value.city = this.city
      }

  console.log(this.accountDetailsForm.value)

  this.dashService.updateUser(this.accountDetailsForm.value).subscribe({
    next:(res)=>{
      console.log(res)
      },
    error:(err:any)=> {console.log( err.error.msg)}
    
  })



}

}
