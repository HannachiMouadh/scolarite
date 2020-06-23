import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Userid } from '../shared/userid';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  constructor(private afs: AngularFirestoreModule,
    private db: AngularFireDatabase,
     private datePipe: DatePipe,
     private auth: AuthService) { 
    }

  enseignantList: AngularFireList<any>;


  
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nomPrenom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    telep: new FormControl('', [Validators.required, Validators.minLength(8)]),
    ville: new FormControl(''),
    department: new FormControl(0),
    dateEmb: new FormControl(''),
    chef: new FormControl(false)
  });




  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      nomPrenom: '',
      email: '',
      telep: '',
      ville: '',
      department: 0,
      dateEmb: '',
      chef: false
    });
  }


  getEnseignants() {
    this.enseignantList = this.db.list('enseignants');
    return this.enseignantList.snapshotChanges();
  }

  insertEnseignant(enseignant) {
    this.enseignantList.push({
      nomPrenom: enseignant.nomPrenom,
      email: enseignant.email,
      telep: enseignant.telep,
      ville: enseignant.ville,
      department: enseignant.department,
       dateEmb: enseignant.dateEmb == "" ? "" : this.datePipe.transform(enseignant.dateEmb, 'yyyy-MM-dd'),
      chef: enseignant.chef
    });
  }

  updateEnseignant(enseignant) {
    this.enseignantList.update(enseignant.$key,
      {
        nomPrenom: enseignant.nomPrenom,
        email: enseignant.email,
        telep: enseignant.telep,
        ville: enseignant.ville,
        department: enseignant.department,
        dateEmb: enseignant.dateEmb == "" ? "" : this.datePipe.transform(enseignant.dateEmb, 'yyyy-MM-dd'),
        chef: enseignant.chef
      });
  }

  deleteEnseignant($key: string) {
    this.enseignantList.remove($key);
  }

  populateForm(enseignant) {
    this.form.setValue(_.omit(enseignant,'nomDepartment'));
  }
}