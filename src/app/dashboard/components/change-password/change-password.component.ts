import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormBuilder, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [MessageService]

})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb:FormBuilder , private dashService:DashboardService , private messageService: MessageService) { }
  matchPasswordErr:boolean = false
  changePassForm = this.fb.group({

    oldPassword:     ['', [Validators.required, Validators.minLength(4)]],
    newPassword:     ['', [Validators.required, Validators.minLength(4)]],
    reTypedPassword: ['', [Validators.required, Validators.minLength(4)]],
    
  });

  ngOnInit(): void {

  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Data Changed Successfully'});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Try Again'});
  }

  onSubmit(){
    console.log(this.changePassForm.value)

    if(this.changePassForm.value.reTypedPassword !== 
      this.changePassForm.value.newPassword){
         this.matchPasswordErr = true
         setTimeout(()=>{this.matchPasswordErr = false},3000)
         this.showError()
         return}
    
  this.dashService.changeUserPass(this.changePassForm.value).subscribe({
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
