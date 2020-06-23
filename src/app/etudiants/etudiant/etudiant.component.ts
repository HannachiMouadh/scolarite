import { Component, OnInit , Input} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EtudianttService } from '../../shared/etudiantt.service';
import { NotificationService } from '../../shared/notification.service';
import { SpecialiteService } from '../../shared/specialite.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  startDate: Date;
  constructor(private etudService: EtudianttService,
    private specialiteService: SpecialiteService,
    private notifiService: NotificationService,
    public matDialogRef: MatDialogRef<EtudiantComponent>) { }

  

  ngOnInit() {
    this.etudService.getEtudiant();
    this.startDate = new Date();
  }
 
  onClear() {
    this.etudService.form.reset();
    this.etudService.initializeFormGroup();
    this.notifiService.success('Données reinitialiser!');
  }

  onSubmit() {
    if (this.etudService.form.valid) {
      if (!this.etudService.form.get('$key').value)
        this.etudService.insertEtudiant(this.etudService.form.value);
      else
      this.etudService.updateEtudiant(this.etudService.form.value);
      this.etudService.form.reset();
      this.etudService.initializeFormGroup();
      this.notifiService.success('Soumis avec succès!');
      this.onClose();
    }
  }

  onClose() {
    this.etudService.form.reset();
    this.etudService.initializeFormGroup();
    this.matDialogRef.close();
  }

}