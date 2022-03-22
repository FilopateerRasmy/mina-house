import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers:[MessageService]
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb:FormBuilder,private auth:AuthService,private messageService: MessageService,private router:Router){}

  msg=""
  forgotPasswordForm= this.fb.group({
    
    email: ['', [Validators.required, Validators.email]]})

  ngOnInit(): void {
    
  }

  getErrors(field: string) {
    return this.forgotPasswordForm.get(field)?.errors;
  }
  getField(field: string) {
    return this.forgotPasswordForm.get(field);
  }
  
showSuccess() {
  this.messageService.add({severity:'success', summary: 'Success', detail: 'Email Sent Successfully'});
}

showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Try Again'});
}

  onSubmit(){
    console.log(this.forgotPasswordForm.value.email)
    this.auth.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next:(res)=>{
        console.log(res )
        this.showSuccess()
      setTimeout(()=>{ this.router.navigateByUrl('/users/recover-password/instructions');},1500)
        },
      error:(err:any)=> {this.msg = err.error.msg}
      
    })
  }

}
