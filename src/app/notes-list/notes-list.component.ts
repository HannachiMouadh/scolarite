import { Component, OnInit, ViewChild } from '@angular/core';
import { DepotNoteService } from 'src/app/shared/depotNote.service';
import {  MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import {of as observableOf} from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../shared/auth.service';
import { Userid} from '../shared/userid';


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  demandesList: AngularFireList<any>;
  demande:any;
  actionDemande: boolean;
  depotNoteService: any;
  demandes: Observable<any[]>;


  user: Observable<firebase.User>;


  //auto generated navbar
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


  constructor(private depotService:DepotNoteService , private dialog:MatDialog,
    private notificationService:NotificationService,
    private dialogService:DialogService,
    private af:AngularFireDatabase,
    private breakpointObserver: BreakpointObserver,
        public Auth:AngularFireAuth,
        public router:Router,
        private db:AngularFireDatabase,
        private authservice:AuthService,) {
          this.user = this.authservice.userStatus();
        }

    listData: MatTableDataSource<any>;
    displayedColumns: string[]=['nameFull','dateAttribution','classe','matiere','cin','type','note','actions2'];
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