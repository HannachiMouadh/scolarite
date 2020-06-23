import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList, AngularFireObject, snapshotChanges ,} from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DepotNoteService {

  demande: Observable<{}[]>;
  url: string;
  userId:string;
  demandesList: AngularFireList<{}>;
  demandes:Observable<{}[]>;

  constructor(private firebase:AngularFireDatabase,private datePipe: DatePipe, 
              private afAuth:AngularFireAuth,
              ) { 
                this.afAuth.authState.subscribe(user=>{
                  if(user) this.userId=user.uid
                });
              this.demandes=this.firebase.list('note').valueChanges();

              }

  form:FormGroup=new FormGroup({
    $key:new FormControl(null),
    nameFull:new FormControl(''),
    dateAttribution: new FormControl('',Validators.required),
    classe: new FormControl('',Validators.required),
    matiere: new FormControl('',Validators.required),
    userId:new FormControl(''),
    cin:new FormControl(''),
    note:new FormControl(''),
  });

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      nameFull:'',
      dateAttribution:'',
      cin:'',
      classe: '',
      matiere:'',
      userId:this.userId,
      note:'',
    });
  }
//database_actions

getDemande(){
  if(!this.userId) return;
  this.demandesList= this.firebase.list('/note', ref => 
ref.orderByChild('userId').equalTo(this.userId))
return this.demandesList.snapshotChanges()

}

getDemandes(){
this.demandesList=this.firebase.list(`note/`);
return this.demandesList.snapshotChanges()
}
insertDemande(demande){
  demande.userId=this.userId
  this.demandesList.push({
    dateAttribution:demande.dateAttribution== "" ? "" : this.datePipe.transform(demande.dateAttribution, 'dd-MM-yyyy'),
    classe:demande.classe,
    cin:demande.cin,
    matiere:demande.matiere,
    userId: demande.userId,
    note:demande.note,
    nameFull: demande.nameFull,

  });

}




deleteDemande($key:string){
  this.demandesList.remove($key);
}



Accept(demande){
  this.demandesList.update(`${demande.$key}`,{note: this.userId});
}
}
