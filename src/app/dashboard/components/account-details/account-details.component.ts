import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormBuilder, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  providers:[MessageService]
})
export class AccountDetailsComponent implements OnInit {

  constructor(private fb:FormBuilder , private dashService:DashboardService, private messageService: MessageService) { }
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

showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Try Again'});
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
          phone : "0"+(res.user.phone).toString() 
      })
      
      
      },
    error:(err:any)=> {console.log( err.error.msg)}
    
  })
}


onSubmit(){

      

  console.log(this.accountDetailsForm.value)
  
  this.dashService.updateUser(this.accountDetailsForm.value).subscribe({
    next:(res)=>{
      console.log(res)
      this.showSuccess()
      },
    error:(err:any)=> {
      console.log( err.error.msg)
      this.showError()
    }
    
  })



}

}
