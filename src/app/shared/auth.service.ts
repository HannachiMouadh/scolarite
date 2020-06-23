import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { NgZone } from '@angular/core';
import { User } from "../shared/user";
import { auth } from 'firebase/app';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:Observable<firebase.User>;



  constructor( private afAuth:AngularFireAuth)  {    
      this.user=afAuth.user;
    }


  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }


  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }




  userStatus() {
    return this.afAuth.authState;
  }








}