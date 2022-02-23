import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private auth:AuthService) { }

  // userToken :string = ''
  // userDetails:UserData ={name:'',userId:'',role:''}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })
  ngOnInit(): void {
  }
  getErrors(field: string) {
    return this.loginForm.get(field)?.errors;
  }
  getField(field: string) {
    return this.loginForm.get(field);
  }
  onLogin()
  {
    this.auth.login(this.loginForm.value).subscribe({
      next:(userData)=>{

        console.log(userData)
 
     

        },
      error:(err:any)=> {console.log(err.error.msg)}
      
    })
  }
  onLogout(){
   
  }

}
