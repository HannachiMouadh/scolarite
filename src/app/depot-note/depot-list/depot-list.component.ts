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


@Component({
  selector: 'app-depot-list',
  templateUrl: './depot-list.component.html',
  styleUrls: ['./depot-list.component.css']
})
export class DepotListComponent implements OnInit {
  imageList: any[];
  rowIndexArray: any[];

  constructor(private depotService:DepotNoteService , private dialog:MatDialog,
    private notificationService:NotificationService,
    private dialogService:DialogService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[]=['nameFull','dateAttribution','classe','matiere','cin','note','actions'];
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
  }
