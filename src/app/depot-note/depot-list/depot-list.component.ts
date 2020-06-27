import { Component, OnInit, ViewChild } from '@angular/core';
import { DepotNoteService } from 'src/app/shared/depotNote.service';
import { MatTableDataSource} from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DepotComponent } from '../depot/depot.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImageService } from '../../shared/image.service';
import { NoteComponent } from 'src/app/note/note.component';


@Component({
  selector: 'app-depot-list',
  templateUrl: './depot-list.component.html',
  styleUrls: ['./depot-list.component.css']
})
export class DepotListComponent implements OnInit {
  imageList: any[];
  rowIndexArray: any[];
  
  actionDemande: boolean;

  constructor(private depotService:DepotNoteService , private dialog:MatDialog,
    private notificationService:NotificationService,
    private dialogService:DialogService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[]=['nameFull','dateAttribution','classe','matiere','cin','note','actions2'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey:String;
  
  ngOnInit() {
    this.depotService.getDemandes().subscribe(
      list=>{
        let array= list.map(item=>{
          return{
            $key:item.key,
            ...item.payload.val()
          };
        });
        //api vers tabla auth (arr
        
        this.listData=new MatTableDataSource(array);
        this.listData.sort=this.sort;
        this.listData.paginator=this.paginator;
      });
  }

  onAccept(row){
    this.dialogService.openConfirmDialog('Vous voulez vraiment Attribuer cette note ?')
    .afterClosed().subscribe(res=>{
      if(res){
        this.depotService.Accept(row);
            this.notificationService.success('note attribué !');
            this.actionDemande = false ;
      }
    });
}

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter=this.searchKey.trim().toLowerCase();
  }
  onCreate(){
    this.depotService.initializeFormGroup();
    const dialogConfig =new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(DepotComponent,dialogConfig);
  }

  onDelete($key){

    this.dialogService.openConfirmDialog('Vous voulez vraiment supprimer cette note ?')
    .afterClosed().subscribe(res=>{
      if(res){
        this.depotService.deleteDemande($key);
        this.notificationService.warn('note est supprimé !');
      }
    });
  }
  onNote(row){
    console.log(row);
    this.depotService.populateForm(row);
    const dialogConfig =new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(NoteComponent,dialogConfig);
  }
  deleteNote(row){
    row.note = '';
    console.log(row)
  /*
    this.depotService.form.note = null;
    this.depotService.form.cin = row.cin;
    this.depotService.form.classe = row.classe;
    this.depotService.form.matiere = row.matiere;
    this.depotService.form.dateAttribution = row.dateAttribution;
    this.depotService.form.nameFull = row.nameFull;
    this.depotService.form.$key = row.$key;
    this.depotService.form.userId = row.userId;
    */
    
    this.depotService.updateDemande(row);
  }
}

