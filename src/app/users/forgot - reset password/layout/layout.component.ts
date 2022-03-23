import { Component, OnInit } from '@angular/core';
import {PrimeIcons} from 'primeng/api';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  route:string=''
  constructor() { 
    
  }
  events: any[] = [];
  items:MenuItem[]=[]
  ngOnInit(): void {
    this.events = [
      {status: 'Forgot Password', icon: PrimeIcons.LOCK, color: '#9C27B0', link:'forgot-password'},
      {status: 'Status', icon: PrimeIcons.COG, color: '#673AB7',link:'instructions'},
      {status: 'Reset', icon: PrimeIcons.CHECK, color: '#607D8B',link:'reset-password'}
  ];
  
   

  }
  
}



