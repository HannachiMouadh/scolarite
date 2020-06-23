import { EnseignantComponent } from './../enseignant/enseignant.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EnseignantService } from '../../shared/enseignant.service';
import { MatTableDataSource} from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DepartmentService } from '../../shared/department.service';

import { NotificationService } from '../../shared/notification.service';
import { DialogService } from '../../shared/dialog.service';

@Component({
  selector: 'app-enseignant-list',
  templateUrl: './enseignant-list.component.html',
  styleUrls: ['./enseignant-list.component.css']
})
export class EnseignantListComponent implements OnInit {

  constructor(private ensService: EnseignantService,
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private notifiService: NotificationService,
    private dialogService: DialogService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['nomPrenom','email','telep','ville','dateEmb','nomDepartment','chef','actions',];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.ensService.getEnseignants().subscribe(
      list => {
        let array = list.map(item => {
          let nomDepartment = this.departmentService.getDepartmentName(item.payload.val()['department']);
          return {
            $key: item.key,
            nomDepartment,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
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
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  onCreate() {
    this.ensService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EnseignantComponent,dialogConfig);
  }

  onEdit(row){
    this.ensService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EnseignantComponent,dialogConfig);
  }

  onDelete($key){
    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer cet enseignant ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.ensService.deleteEnseignant($key);
        this.notifiService.warn('Supprimé avec succès !');
      }
    });
  }
}