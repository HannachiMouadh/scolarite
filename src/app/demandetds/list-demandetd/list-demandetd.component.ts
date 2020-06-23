import { Component, OnInit, ViewChild } from '@angular/core';
import { DemandcertService } from 'src/app/shared/demandcert.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { MatDialogConfig, MatDialog} from '@angular/material/dialog'
import { DemandetdComponent } from '../demandetd/demandetd.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { SpecialiteService } from '../../shared/specialite.service';




@Component({
  selector: 'app-list-demandetd',
  templateUrl: './list-demandetd.component.html',
  styleUrls: ['./list-demandetd.component.css']
})
export class ListDemandetdComponent implements OnInit {

  constructor(private certService:DemandcertService , private dialog:MatDialog,
    private notificationService:NotificationService,
    private dialogcertService:DialogService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[]=['fullName','cin','dateDepot','classe','specialite','etat','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey:String;
  
  ngOnInit() {
    this.certService.getDemandes().subscribe(
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
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(element => {
            return element != 'actions' && data[element].toLowerCase().indexOf(filter) != -1;
          });
        };
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
    this.certService.initializeFormGroup();
    const dialogConfig =new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(DemandetdComponent,dialogConfig);
  }

  onDelete($key){

    this.dialogcertService.openConfirmDialog('Vous voulez vraiment supprimer cette demande ?')
    .afterClosed().subscribe(res=>{
      if(res){
        this.certService.deleteDemande($key);
        this.notificationService.warn('demande est supprimé !');
      }
    });
  }

}
