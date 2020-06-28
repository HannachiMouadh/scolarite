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
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import {of as observableOf, Observable} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-depot-list',
  templateUrl: './depot-list.component.html',
  styleUrls: ['./depot-list.component.css']
})
export class DepotListComponent implements OnInit {
  imageList: any[];
  rowIndexArray: any[];
  actionDemande: boolean;

  user: Observable<firebase.User>;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
    uid=this.Auth.authState.pipe(
      map(authState=>{
        if(!authState){
          return null;
        }else{
          return authState.uid;
        }
      })
      );
      isEns:Observable<boolean>=this.uid.pipe(
        switchMap(uid=>{
          if(!uid){
            return observableOf(false);
          }else{
            return this.db.object<boolean>('/isEns/'+uid).valueChanges();
          }
        })
      );
  isAdmin:Observable<boolean>=this.uid.pipe(
    switchMap(uid=>{
      if(!uid){
        return observableOf(true);
      }else{
        return this.db.object<boolean>('/isAdmin/'+uid).valueChanges();
      }
    })
  );

  constructor(private depotService:DepotNoteService,
    private notificationService:NotificationService,
    private dialogService:DialogService,
    private storage: AngularFireStorage,
    public Auth:AngularFireAuth,
    private breakpointObserver: BreakpointObserver,
        public router:Router,
        private db:AngularFireDatabase,
        private dialog:MatDialog,
        private authservice:AuthService,
          ) { this.user = this.authservice.userStatus();}

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
    this.depotService.updateDemande(row);
  }
}

