import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private auth:AuthService,private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.auth.logout()
    this.router.navigateByUrl('/')
}
}