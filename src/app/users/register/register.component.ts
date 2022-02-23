import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

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
      state: ['',Validators.required],
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
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }

    })
  }

}
