import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit {

  constructor(private dashService:DashboardService) { }
 
  userToken:string='';
  userID:string='';
  name:string='';
  email:string='';
  password:string='';
  street:string='';
  city:string='';
  phone:string='0';

ngOnInit(): void {
  this.getUserID()
  this.accountOverview()
}
getDecodedAccessToken(token: string): any {
  try {
    return jwt_decode(token);
  } catch(Error) {
    return null;
  }
}
getUserID(){
  const user:any  = localStorage.getItem('user')
  this.userToken = JSON.parse(user).token
  console.log(this.userToken)
  const  tokenInfo = this.getDecodedAccessToken(  this.userToken ); // decode token
  this.userID = tokenInfo.userId
  console.log(this.userID)
  // return this.userID
}
accountOverview(){
  
  this.dashService.getUser(this.userID).subscribe({
    next:(res)=>{

     console.log(res.user)
      this.street = res.user.address.street
      this.city = res.user.address.city
      this.phone += (res.user.phone).toString() 
      // console.log(this.phone)
      this.name = res.user.name
      this.email = res.user.email
      },
    error:(err:any)=> {console.log( err.error.msg)}
    
  })
}
}
