import { Component, OnInit , Input} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EnseignantService } from '../../shared/enseignant.service';
import { DepartmentService } from '../../shared/department.service';
import { NotificationService } from '../../shared/notification.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Userid } from '../../shared/userid';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent implements OnInit {

  
  constructor(private service: EnseignantService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EnseignantComponent>,
    private firebase:AngularFireDatabase) { }



  ngOnInit() {
    this.service.getEnseignants();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success('Données reinitialiser!');
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value)
        this.service.insertEnseignant(this.service.form.value);
      else
      this.service.updateEnseignant(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Soumis avec succès!');
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}