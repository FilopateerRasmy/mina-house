import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IresetPassword } from 'src/app/shared/IresetPassword';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers:[MessageService]
})
export class ResetPasswordComponent implements OnInit {

  constructor(private fb:FormBuilder,private auth:AuthService,private route:ActivatedRoute,
    private messageService: MessageService,private router:Router){}

  resetPassObjec:any
  showPasswordIcon1:boolean = false
  
  resetPasswordForm = this.fb.group({
    
    password:['', [Validators.required, Validators.minLength(4)]]
  });
  
  toggleFieldTextType() {
    this.showPasswordIcon1 = !this.showPasswordIcon1;
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Password Changed Successfully'});
  }
  
  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Try Again'});
  }
  msg=""
  
  ngOnInit(): void {
    this.route.queryParamMap
  .subscribe((params) => {
    this.resetPassObjec = {  ...params };
  }
);
  }

  getErrors(field: string) {
    return this.resetPasswordForm.get(field)?.errors;
  }
  getField(field: string) {
    return this.resetPasswordForm.get(field);
  }

  onSubmit(){

    const resetPasswordData:IresetPassword = {
      token : this.resetPassObjec.params.token,
      email : this.resetPassObjec.params.email,
      password : this.resetPasswordForm.value.password
    }
    this.auth.resetPassword(resetPasswordData).subscribe({
      next:(res)=>{
        console.log(res)
        this.showSuccess()
        setTimeout(()=>{ this.router.navigateByUrl('/users');},1500)
        
        },
      error:(err:any)=> {
        this.msg = err.error.msg
        this.showError()
      }
      
    })
  }

}
