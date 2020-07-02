import { Component, OnInit } from '@angular/core';
import { DepotNoteService } from '../../shared/depotNote.service';
import { NotificationService } from '../../shared/notification.service';
import { DepartmentService } from '../../shared/department.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { AngularFireList, AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { DialogService } from 'src/app/shared/dialog.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ImageService } from '../../shared/image.service';
import {ClassService } from '../../shared/class.service';
import {MatSliderModule} from '@angular/material/slider';

interface Etudiant {
  value: string;
  viewValue: string;
}
interface Class {
  value: string;
  viewValue: string;
}
interface Subject {
  value: string;
  viewValue: string;
}
interface TypeNote {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.css']
})
export class DepotComponent implements OnInit {
  demande: any;
  demandesList:AngularFireList<any>;
  uploadNote:any;
  downloadURL:Observable<string>;
 ref:AngularFireStorageReference;
 task:AngularFireUploadTask;
  errorMessage: boolean;
  selectedFiles: FileList ;

  etudiants: Etudiant[] = [
    {value: 'Ahmad chaoch', viewValue: 'Ahmad chaoch'},
    {value: 'Dhia hosni', viewValue: 'Dhia hosni'},
    {value: 'iadh hrechi', viewValue: 'iadh hrechi'},
    {value: 'bassem belhaj', viewValue: 'bassem belhaj'},
    {value: 'houda hsony', viewValue: 'houda hsony'},
    {value: 'Ali chikh', viewValue: 'Ali chikh'},
    {value: 'Safa jridi', viewValue: 'Safa jridi'},
  ];
  classes: Class[] = [
    {value: 'L1TI', viewValue: 'L1TI'},
    {value: 'L2RSI', viewValue: 'L2RSI'},
    {value: 'L2SEM', viewValue: 'L2SEM'},
    {value: 'L3RSI', viewValue: 'L3RSI'},
    {value: 'L3SEM', viewValue: 'L3SEM'},

  ];
  subjects: Subject[] = [
    {value: 'RSF', viewValue: 'RSF'},
    {value: 'SécuResau', viewValue: 'SécuResau'},
    {value: 'AdminSerReseau', viewValue: 'AdminSerReseau'},
    {value: 'Françai', viewValue: 'Françai'},
    {value: 'Anglais', viewValue: 'Anglais'},

  ];
  typeNotes: TypeNote[] = [
    {value: 'NP', viewValue: 'NP'},
    {value: 'CC', viewValue: 'CC'},
    {value: 'DS', viewValue: 'DS'},
    {value: 'TP', viewValue: 'TP'},

  ];

   constructor(private depotNoteService:DepotNoteService,
              private notificationService:NotificationService,
              private departmentService:DepartmentService,
              public dialogRef : MatDialogRef<DepotComponent>,
              public afStorage:AngularFireStorage,
              public db:AngularFireDatabase,
              private dialog:MatDialog,

              ) { }


  ngOnInit() {
    this.depotNoteService.getDemande();
  }
  onEffacer(){
    this.depotNoteService.form.reset();
    this.depotNoteService.initializeFormGroup();
    this.notificationService.warn('Données sont effacées');

  }
  onSubmit(){
    if(this.depotNoteService.form.valid){
      this.depotNoteService.insertDemande(this.depotNoteService.form.value);
      this.depotNoteService.form.reset();
      this.depotNoteService.initializeFormGroup();
      this.notificationService.success('Fichier de note ajouté ');
      this.onClose();
  }}
  onClose(){
    this.depotNoteService.form.reset();
    this.depotNoteService.initializeFormGroup();
    this.dialogRef.close();
  }
}
