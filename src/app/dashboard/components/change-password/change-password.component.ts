import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormBuilder, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [MessageService]

})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb:FormBuilder , private dashService:DashboardService , private messageService: MessageService,private router:Router) { }
  matchPasswordErr:boolean = false

  showPasswordIcon1:boolean = false
  showPasswordIcon2:boolean = false
  showPasswordIcon3:boolean = false

  changePassForm = this.fb.group({
    
    oldPassword:     ['', [Validators.required, Validators.minLength(4)]],
    newPassword:     ['', [Validators.required, Validators.minLength(4)]],
    reTypedPassword: ['', [Validators.required, Validators.minLength(4)]],
    
  });
  
  ngOnInit(): void {

  }
  toggleFieldTextType() {
    this.showPasswordIcon1 = !this.showPasswordIcon1;
  }
  toggleFieldTextType2() {
    this.showPasswordIcon2 = !this.showPasswordIcon2;
  }
  toggleFieldTextType3() {
    this.showPasswordIcon3 = !this.showPasswordIcon3;
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Data Changed Successfully'});
  }

  showError(msg:string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: msg});
  }

  onSubmit(){

    if(this.changePassForm.value.reTypedPassword !== 
      this.changePassForm.value.newPassword){
         this.matchPasswordErr = true
         setTimeout(()=>{this.matchPasswordErr = false},3000)
         this.showError("Passwords Don't Match")
         return}
    
  this.dashService.changeUserPass(this.changePassForm.value).subscribe({
    next:(res)=>{
      this.showSuccess()
      setTimeout(()=>{ this.router.navigateByUrl('/customer/account/overview');},1500)
      },
    error:(err:any)=> {
      this.showError('Please Provide a valid Password')
    }
    
  })
  }
}
