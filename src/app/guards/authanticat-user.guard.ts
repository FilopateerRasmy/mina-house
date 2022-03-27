import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthanticatUserGuard implements CanLoad {
  constructor(private auth:AuthService, private router:Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.userData.isLogin){
        return true
      }else{
        this.router.navigateByUrl('/users');
        return false
      }
  }

}
