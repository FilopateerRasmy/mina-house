import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss'],
  providers:[MessageService]

})
export class AccountOverviewComponent implements OnInit {

  constructor(private dashService:DashboardService,private messageService: MessageService) { }
 
  
  name:string='';
  email:string='';
  password:string='';
  street:string='';
  city:string='';
  phone:string='0';

ngOnInit(): void {
  this.dashService.getUserID()
  this.accountOverview()
}
showSuccess() {
  this.messageService.add({severity:'success', summary: 'Success', detail: 'Data Changed Successfully'});
}

showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Please refresh the page'});
}
accountOverview(){
  
  this.dashService.getUser(this.dashService.userID).subscribe({
    next:(res)=>{

      console.log(res)
    //  console.log(res.user)



      this.street = res.user.address.street
      this.city = res.user.address.city
      // we add the += as the 0 is not included so we intialize the 
      // the phone variable with 0 and then add the actual number on it
      this.phone += (res.user.phone).toString() 
      this.name = res.user.name
      this.email = res.user.email
      },

    error:(err:any)=> {this.showError()}

  })
}
}
