import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { NotificationService } from '../shared/notification.service';
import { DepotNoteService } from '../shared/depotNote.service';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  actionDemande: boolean;

  constructor(private depotNoteService:DepotNoteService,
    private notificationService:NotificationService,
    public dialogRef : MatDialogRef<NoteComponent>,
    public afStorage:AngularFireStorage,
    public db:AngularFireDatabase,
    private dialogService:DialogService,
    private dialog:MatDialog,) {
}

  ngOnInit() {
    this.depotNoteService.getDemande();
  }
  onSubmit(){
    console.log(this.depotNoteService.form.value)
   
      this.depotNoteService.updateDemande(this.depotNoteService.form.value);
   /* this.depotNoteService.form.reset();
      this.depotNoteService.initializeFormGroup();*/
      this.notificationService.success('Fichier de note ajouté ');
      this.dialogRef.close();
}
onClose(){
  this.depotNoteService.form.reset();
  this.depotNoteService.initializeFormGroup();
  this.dialogRef.close();
}
}
