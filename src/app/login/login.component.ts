import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators} from'@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {LoginModel} from '../login/model/login.model';
import { NotificationService } from '../shared/notification.service';
import { FormControl } from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  user:LoginModel= new LoginModel();
  loginForm :FormGroup;
  hide=true;

  constructor(private formBuilder:FormBuilder,
              private fire:AngularFireAuth,
              private router:Router,
              private notification: NotificationService) { 
                this.loginForm = new FormGroup({
                  email: new FormControl(''),
                  password: new FormControl(''),
               });
              }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      'email':[this.user.email,[Validators.required,Validators.email]],
      'password':[this.user.password,[Validators.required,Validators.minLength(8),Validators.maxLength(30)]]
    });
  }


onLogin(){
  this.fire.auth.signInWithEmailAndPassword(this.user.email,this.user.password)
  .then(user =>{
    console.log(this.user.email,this.user.password);
    this.router.navigate(['navbar/home']);
  }).catch(error=>{
    console.error(error);
    this.notification.warn("utilisateur introuvable ");
  })
}

doGoogleLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.fire.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);
    })
  })
}

doFacebookLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.FacebookAuthProvider();
    this.fire.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);
    }, err => {
      console.log(err);
      reject(err);
    })
  })
}

}
