import { Component, OnInit, ViewChild } from '@angular/core';
import { DemandcertService } from 'src/app/shared/demandcert.service';
import { MatTableDataSource} from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl } from '@angular/forms';
import { Key } from 'protractor';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {
  demandesList: AngularFireList<any>;
  demande:any;
  actionDemande: boolean;


  constructor(private certifService:DemandcertService , private dialog:MatDialog,
    private notificationService:NotificationService,
    private dialogService:DialogService,
    private af:AngularFireDatabase) { }

    listData: MatTableDataSource<any>;
    displayedColumns: string[]=['fullName','dateDepot','classe','specialite','cin','etat','actions','actions2'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
    searchKey:String;
    ngOnInit() {
      this.certifService.getDemandes().subscribe(
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
      this.dialogService.openConfirmDialog('Vous voulez vraiment accepter cette demande ?')
      .afterClosed().subscribe(res=>{
        if(res){
          this.certifService.Accept(row);
              this.notificationService.success('demande acceptée !');
              this.actionDemande = false ;
        }
      });
}

onDecline(row){
  this.dialogService.openConfirmDialog('Vous voulez vraiment rejeter cette demande ?')
  .afterClosed().subscribe(res=>{
    if(res){
      this.certifService.Decline(row);
          this.notificationService.warn('demande refusée !');
          this.actionDemande = false ;
    }
  });
}

onDelete($key){

  this.dialogService.openConfirmDialog('Vous voulez vraiment supprimer cette demande ?')
  .afterClosed().subscribe(res=>{
    if(res){
      this.certifService.deleteDemande($key);
      this.notificationService.warn('demande est supprimé !');
    }
  });
}

}