import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
msg = ''
  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router) { }

  registerForm = this.fb.group({
    name: [
      '',
      [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    address: this.fb.group({
      street: ['',Validators.required],
      city: ['' ,Validators.required],
    }),
    phone: ['', [Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
  });
  ngOnInit(): void {}
  getErrors(field: string) {
    return this.registerForm.get(field)?.errors;
  }
  getField(field: string) {
    return this.registerForm.get(field);
  }

  onRegister(){
    this.auth.register(this.registerForm.value).subscribe({
      next:(res)=>{
        this.auth.saveUser(res.token, res.user.name);
        this.router.navigateByUrl('/');
      
      },
      error:(err)=>{
        this.msg = err.error.msg
        
      }
  

    })

  }

  
  

}
