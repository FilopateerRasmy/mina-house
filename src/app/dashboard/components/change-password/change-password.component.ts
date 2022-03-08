import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb:FormBuilder , private dashService:DashboardService) { }
  
  changePassForm = this.fb.group({

    oldPassword:     ['', [Validators.required, Validators.minLength(4)]],
    newPassword:     ['', [Validators.required, Validators.minLength(4)]],
    reTypedPassword: ['', [Validators.required, Validators.minLength(4)]],
    
  });

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.changePassForm.value)

  this.dashService.changeUserPass(this.changePassForm.value).subscribe({
    next:(res)=>{
      console.log(res)
      },
    error:(err:any)=> {console.log( err.error.msg)}
    
  })
  }
}
