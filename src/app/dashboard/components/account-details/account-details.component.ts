import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormBuilder, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  providers:[MessageService]
})
export class AccountDetailsComponent implements OnInit {

  constructor(private fb:FormBuilder , private authService:AuthService,private dashService:DashboardService, private messageService: MessageService,private router:Router) { }
  accountDetailsForm = this.fb.group({
    name: [
      '',
      [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]
    ],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      street: ['',Validators.required],
      city: ['' ,Validators.required],
    }),
    phone: ['', [Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
  });
  
 

ngOnInit(): void {
  this.dashService.getUserID()
  this.accountOverview()


}

getErrors(field: string) {
  return this.accountDetailsForm.get(field)?.errors;
}
getField(field: string) {
  return this.accountDetailsForm.get(field);
}

showSuccess() {
  this.messageService.add({severity:'success', summary: 'Success', detail: 'Data Changed Successfully'});
}

showError(msg:string) {
  this.messageService.add({severity:'error', summary: 'Error', detail: msg});
}

accountOverview(){
  
  this.dashService.getUser(this.dashService.userID).subscribe({
    next:(res)=>{
      this.accountDetailsForm.setValue({
        name: res.user.name,
        email:res.user.email,
        address:{
          street :  res.user.address.street,
          city : res.user.address.city
          
        },
        // we add the += as the 0 is not included so we intialize the 
        // the phone variable with 0 and then add the actual number on it
          phone : res.user.phone 
      })
      
      
      },
    error:(err:any)=> {
      this.showError('Please Refresh The Page')
      
  }})
}


onSubmit(){

      

  
  this.dashService.updateUser(this.accountDetailsForm.value).subscribe({
    next:(res)=>{
      this.authService.userData.name = this.accountDetailsForm.get('name')?.value
      this.authService.isAuthanticated.next(this.authService.userData)
      this.showSuccess()
      setTimeout(()=>{ this.router.navigateByUrl('/customer/account/overview');},1500)

      },
    error:(err:any)=> {
      this.showError("Please Try Again")
    }
    
  })



}

}
