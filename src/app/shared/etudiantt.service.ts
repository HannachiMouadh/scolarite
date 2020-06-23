import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EtudianttService {

  constructor(private db: AngularFireDatabase, private datePip: DatePipe,private authservice: AuthService) { }

  etudiantList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nomComplet: new FormControl('', Validators.required),
    emaill: new FormControl('', [Validators.required,Validators.email]),
    pw:new FormControl('',Validators.required),
    telephone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    CIN: new FormControl('', [Validators.required, Validators.minLength(8)]),
    Resid: new FormControl(''),
    specialite: new FormControl(0),
    DateIns: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      nomComplet: '',
      emaill: '',
      pw:'',
      CIN: '',
      telephone: '',
      Resid: '',
      specialite: 0,
      DateIns: '',
    });
  }


  getEtudiant() {
    this.etudiantList = this.db.list('etudiants');
    return this.etudiantList.snapshotChanges();
  }

  insertEtudiant(etudiant) {
    this.etudiantList.push({
      nomComplet: etudiant.nomComplet,
      emaill: etudiant.emaill,
      pw: etudiant.pw,
      CIN: etudiant.CIN,
      telephone: etudiant.telephone,
      Resid: etudiant.Resid,
      specialite: etudiant.specialite,
       DateIns: etudiant.DateIns == "" ? "" : this.datePip.transform(etudiant.DateIns, 'yyyy-MM-dd'),
    });
    //let email = this.form.controls['emaill'].value;
    //let password = this.form.controls['pw'].value;
    //let user_displayName = this.form.controls['nomComplet'].value;
    //console.log("email : " + email +"password" + password+"displayname"+user_displayName);
    //return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  updateEtudiant(etudiant) {
    this.etudiantList.update(etudiant.$key,
      {
        nomComplet: etudiant.nomComplet,
        emaill: etudiant.emaill,
        pw: etudiant.pw,
        CIN: etudiant.CIN,
        telephone: etudiant.telephone,
        Resid: etudiant.Resid,
        specialite: etudiant.specialite,
        DateIns: etudiant.DateIns == "" ? "" : this.datePip.transform(etudiant.DateIns, 'yyyy-MM-dd'),
      });
  }

  deleteEtudiant($key: string) {
    this.etudiantList.remove($key);
  }

  populateForm(etudiant) {
    this.form.setValue(_.omit(etudiant,'nomSpecialite'));
  }
}