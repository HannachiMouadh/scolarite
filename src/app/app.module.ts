import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { EnseignantComponent } from './enseignants/enseignant/enseignant.component';
import { EnseignantsComponent } from './enseignants/enseignants.component';
import { EnseignantService } from './shared/enseignant.service';
import { environment } from '../environments/environment';
import { DepartmentService } from './shared/department.service';
import { EnseignantListComponent } from './enseignants/enseignant-list/enseignant-list.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule} from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { EtudiantComponent } from './etudiants/etudiant/etudiant.component';
import { EtudiantListComponent } from './etudiants/etudiant-list/etudiant-list.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { EtudianttService } from './shared/etudiantt.service';
import {NotificationService} from './shared/notification.service';
import {AuthGuard} from './shared/auth.guard';
import { DemandetdsComponent } from './demandetds/demandetds.component';
import { DemandetdComponent } from './demandetds/demandetd/demandetd.component';
import { ListDemandetdComponent } from './demandetds/list-demandetd/list-demandetd.component';
import { FileUploadModule } from 'ng2-file-upload';
import { DepotNoteComponent } from './depot-note/depot-note.component';
import { DepotComponent } from './depot-note/depot/depot.component';
import { DepotListComponent } from './depot-note/depot-list/depot-list.component';
import { DemandeListComponent } from './demande-list/demande-list.component';
import { DemandcertService } from './shared/demandcert.service';
import { DepotNoteService } from './shared/depotNote.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { NotesListComponent } from './notes-list/notes-list.component';
import { ImageService } from 'src/app/shared/image.service';
import { DialogService } from './shared/dialog.service';
import 'hammerjs';
import{SpecialiteService} from './shared/specialite.service';
import {ClassService} from './shared/class.service';




@NgModule({
  declarations: [
    AppComponent,
    EnseignantsComponent,
    EnseignantComponent,
    EnseignantListComponent,
    MatConfirmDialogComponent,
    HomeComponent,
    NavbarComponent,
    EtudiantsComponent,
    EtudiantComponent,
    EtudiantListComponent,
    LoginComponent,
    DemandetdsComponent,
    DemandetdComponent,
    ListDemandetdComponent,
    DepotNoteComponent,
    DepotComponent,
    DepotListComponent,
    DemandeListComponent,
    NotesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatTableModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    AngularFireAuthModule,
    MatPaginatorModule,
    MatSortModule,FormsModule,
    MatDialogModule,
     MatCardModule,
     MatButtonToggleModule,
     MatMenuModule,
     LayoutModule,
     FileUploadModule,
     
 
  ],
  providers: [ClassService,SpecialiteService,AngularFireStorage,DialogService,EnseignantService,NotificationService,DatePipe,
    DepartmentService,NotificationService,EtudianttService,ImageService,
    AuthGuard,AuthService,DemandcertService,DepotNoteService],
  bootstrap: [AppComponent],
  entryComponents:[NotesListComponent,
    EnseignantComponent,MatConfirmDialogComponent,NotesListComponent,
    EtudiantComponent,LoginComponent,DemandetdComponent,DepotComponent],
})
export class AppModule { }
