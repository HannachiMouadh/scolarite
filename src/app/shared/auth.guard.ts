import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { deprecate } from 'util';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private as:AuthService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | Observable<boolean > | Promise<boolean> {

    return new Promise(resolve=>{
      this.as.user.subscribe(userr=>{
        if(userr) resolve (true);
        else{
          this.router.navigate(['/login'])
          resolve(false);

        }
      })
    })       
  }
}
