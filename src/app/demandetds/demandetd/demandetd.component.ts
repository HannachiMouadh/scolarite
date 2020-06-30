import { Component, OnInit } from '@angular/core';
import { DemandcertService } from '../../shared/demandcert.service';
import { NotificationService } from '../../shared/notification.service';
import { SpecialiteService } from '../../shared/specialite.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { AngularFireList, AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import {AngularFirestore} from '@angular/fire/firestore';
import { DialogService } from 'src/app/shared/dialog.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';


interface Specialty {
  value: string;
  viewValue: string;
}
interface Class {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-demandetd',
  templateUrl: './demandetd.component.html',
  styleUrls: ['./demandetd.component.css']
})
export class DemandetdComponent implements OnInit {

  demandesList:AngularFireList<any>;

  classes: Class[] = [
    {value: 'L1TI', viewValue: 'L1TI'},
    {value: 'L2TI', viewValue: 'L2TI'},
    {value: 'L3TI', viewValue: 'L3TI'},
  ];

  specialties: Specialty[] = [
    {value: 'Aucun', viewValue: 'Aucun'},
    {value: 'RSI', viewValue: 'RSI'},
    {value: 'SEM', viewValue: 'SEM'},
  ];

   constructor(private demandcertService:DemandcertService,
              private notificationService:NotificationService,
              private specialiteService:SpecialiteService,
              public dialogRef : MatDialogRef<DemandetdComponent>,
              private dialog:MatDialog,
             ) { }


  ngOnInit() {
    this.demandcertService.getDemande();
  }

  onEffacer(){
    this.demandcertService.form.reset();
    this.demandcertService.initializeFormGroup();
    this.notificationService.warn('Données sont effacées');

  }
  onSubmit(){
    if(this.demandcertService.form.valid){
      this.demandcertService.insertDemande(this.demandcertService.form.value);
      this.demandcertService.form.reset();
      this.demandcertService.initializeFormGroup();
      this.notificationService.success('Demande de certif ajouté ');
      this.dialogRef.close();
  }
  }
  onClose(){
    this.demandcertService.form.reset();
    this.demandcertService.initializeFormGroup();
    this.dialogRef.close();
  }
   
}
