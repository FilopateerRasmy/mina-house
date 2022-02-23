import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  userToken :string = ''
  userDetails:UserData ={name:'',userId:'',role:''}

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
    this.loginService.login(this.loginForm.value).subscribe({
      next:(userData:UserLogin)=>{
        // console.log(userData)
        console.log(Object.values(userData)[0])
        this.userDetails =Object.values(userData)[0]
        this.userToken = Object.values(userData)[1]
        
        // console.log(this.userDetails.name  )
        // console.log(this.userToken)
        localStorage.setItem(`${this.userDetails.userId}`, this.userToken)

        },
      error:(err:any)=> {console.log(err.error.msg)}
      
    })
  }
  onLogout(){
    localStorage.removeItem(`${this.userDetails.userId}`)
  }

}
