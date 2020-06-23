import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import {of as observableOf} from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../shared/auth.service';
import { Userid} from '../shared/userid';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user: Observable<firebase.User>;


  //auto generated navbar
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
    uid=this.Auth.authState.pipe(
      map(authState=>{
        if(!authState){
          return null;
        }else{
          return authState.uid;
        }
      })
      );
      isEns:Observable<boolean>=this.uid.pipe(
        switchMap(uid=>{
          if(!uid){
            return observableOf(false);
          }else{
            return this.db.object<boolean>('/isEns/'+uid).valueChanges();
          }
        })
      );
      isAdmin:Observable<boolean>=this.uid.pipe(
        switchMap(uid=>{
          if(!uid){
            return observableOf(true);
          }else{
            return this.db.object<boolean>('/isAdmin/'+uid).valueChanges();
          }
        })
      );

      constructor(private breakpointObserver: BreakpointObserver,
        public Auth:AngularFireAuth,
        public router:Router,
        private db:AngularFireDatabase,
        private dialog:MatDialog,
        private authservice:AuthService,) {
          this.user = this.authservice.userStatus();
        }





              onLogout(){
                this.Auth.auth.signOut();
                this.router.navigate(['/login']);
              }

}

