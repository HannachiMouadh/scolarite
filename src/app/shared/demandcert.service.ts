import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList, AngularFireObject, snapshotChanges} from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DemandcertService {

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
              this.demandes=this.firebase.list('demandes-cert').valueChanges();

              }

  form:FormGroup=new FormGroup({
    $key:new FormControl(null),
    dateDepot: new FormControl(''),
    classe: new FormControl('',[Validators.required]),
    specialite: new FormControl('',Validators.required),
    cin: new FormControl('',[Validators.required, Validators.minLength(8)]),
    userId:new FormControl(''),
    etat:new FormControl('en cours de traitement '),
    fullName: new FormControl('',Validators.required),

  
  });

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      dateDepot:'',
      classe: '',
      specialite: '',
      cin:'',
      userId:this.userId,
      etat:'en cours de traitement ',
      fullName:'',
    });
  }
//database_actions

getDemande(){
  if(!this.userId) return;
  this.demandesList= this.firebase.list('/demandes-cert', ref => 
ref.orderByChild('userId').equalTo(this.userId))
return this.demandesList.snapshotChanges()

}

getDemandes(){
this.demandesList=this.firebase.list(`demandes-cert/`);
return this.demandesList.snapshotChanges()
}
insertDemande(demande){
  demande.userId=this.userId
  this.demandesList.push({
    dateDepot:demande.dateDepot== "" ? "" : this.datePipe.transform(demande.dateDepot, 'dd-MM-yyyy'),
    classe:demande.classe,
    specialite:demande.specialite,
    cin:demande.cin,
    userId: demande.userId ,
    etat:demande.etat,
    fullName: demande.fullName,

  });

}




deleteDemande($key:string){
  this.demandesList.remove($key);
}



Accept(demande){
  this.demandesList.update(`${demande.$key}`,{etat:'demande acceptée '});

}
Decline(demande){
  this.demandesList.update(`${demande.$key}`,{etat:'demande refusée '});

}
}
