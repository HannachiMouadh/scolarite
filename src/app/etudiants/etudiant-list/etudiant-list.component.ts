import { EtudiantComponent } from './../etudiant/etudiant.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EtudianttService } from '../../shared/etudiantt.service';
import { MatTableDataSource} from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NotificationService } from '../../shared/notification.service';
import { DialogService } from '../../shared/dialog.service';
import { SpecialiteService } from '../../shared/specialite.service';

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.css']
})
export class EtudiantListComponent implements OnInit {

  constructor(private etudiantService: EtudianttService,
    private matDialog: MatDialog,
    private specialiteService: SpecialiteService,
    private notifService: NotificationService,
    private dialogService: DialogService) { }

  dataList: MatTableDataSource<any>;
  displayedColumns: string[] = ['nomComplet', 'emaill','CIN','telephone','DateIns','nomSpecialite','action',];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.etudiantService.getEtudiant().subscribe(
      list => {
        let array = list.map(item => {
          let nomSpecialite = this.specialiteService.getSpecialiteName(item.payload.val()['specialite']);
          return {
            $key: item.key,
            nomSpecialite,
            ...item.payload.val()
          };
        });
        this.dataList = new MatTableDataSource(array);
        this.dataList.sort = this.sort;
        this.dataList.paginator = this.paginator;
        this.dataList.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(element => {
            return element != 'actions' && data[element].toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataList.filter = this.searchKey.trim().toLowerCase();
  }


  onCreat() {
    this.etudiantService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.matDialog.open(EtudiantComponent,dialogConfig);
  }

  onEdit(row){
    this.etudiantService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.matDialog.open(EtudiantComponent,dialogConfig);
  }

  onDelete($key){
    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer cet enseignant ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.etudiantService.deleteEtudiant($key);
        this.notifService.warn('Supprimé avec succès !');
      }
    });
  }
}