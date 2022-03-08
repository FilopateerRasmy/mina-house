import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router) { }

  msg = ''

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })
  ngOnInit(): void {
    // console.log(this.loginForm.value)
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
      next:(res)=>{

        this.auth.saveUser(res.token, res.user.name);
        this.router.navigateByUrl('/');
 
     

        },
      error:(err:any)=> {this.msg = err.error.msg}
      
    })
  }
  onLogout(){
   
  }

}
