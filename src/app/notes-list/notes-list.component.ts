import { Component, OnInit, ViewChild } from '@angular/core';
import { DepotNoteService } from 'src/app/shared/depotNote.service';
import {  MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  demandesList: AngularFireList<any>;
  demande:any;
  actionDemande: boolean;


  constructor(private depotService:DepotNoteService , private dialog:MatDialog,
    private notificationService:NotificationService,
    private dialogService:DialogService,
    private af:AngularFireDatabase) { }

    listData: MatTableDataSource<any>;
    displayedColumns: string[]=['nameFull','dateAttribution','classe','matiere','cin','note','actions','actions2'];
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
  
          this.listData=new MatTableDataSource(array);
          this.listData.sort=this.sort;
          this.listData.paginator=this.paginator;
        });
    }

  
    onSearchClear(){
      this.searchKey="";
      this.applyFilter();
    }
    applyFilter(){
      this.listData.filter=this.searchKey.trim().toLowerCase();
    }

    onAccept(row){
      this.dialogService.openConfirmDialog('Vous voulez vraiment accepter cette note ?')
      .afterClosed().subscribe(res=>{
        if(res){
          this.depotService.Accept(row);
              this.notificationService.success('note acceptée !');
              this.actionDemande = false ;
        }
      });
}


onDelete($key){

  this.dialogService.openConfirmDialog('Vous voulez vraiment supprimer cette demande ?')
  .afterClosed().subscribe(res=>{
    if(res){
      this.depotService.deleteDemande($key);
      this.notificationService.warn('demande est supprimé !');
    }
  });
}

}