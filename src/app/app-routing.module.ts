import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {EnseignantsComponent} from './enseignants/enseignants.component';
import {HomeComponent} from './home/home.component';
import {EtudiantsComponent} from './etudiants/etudiants.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from "./shared/auth.guard";
import { DepotNoteComponent } from './depot-note/depot-note.component';
import { DepotComponent } from './depot-note/depot/depot.component';
import { DepotListComponent } from './depot-note/depot-list/depot-list.component';
import { DemandeListComponent } from './demande-list/demande-list.component';
import { DemandetdsComponent } from './demandetds/demandetds.component';
import { DemandetdComponent } from './demandetds/demandetd/demandetd.component';
import { ListDemandetdComponent } from './demandetds/list-demandetd/list-demandetd.component';
import { NotesListComponent } from './notes-list/notes-list.component';



const routes: Routes = [
 {path:'',redirectTo:'navbar/home', pathMatch:'full'},
 { path: 'login', component: LoginComponent},
  {path:'navbar',component:NavbarComponent,canActivate:[AuthGuard],
children:[
    {path:'home',component:HomeComponent},
    {path:'enseignants',component:EnseignantsComponent},
    {path:'etudiants',component:EtudiantsComponent},
    {path:'demandetds',component:DemandetdsComponent},
    {path:'depot-note',component:DepotNoteComponent},
    {path:'demande-list',component:DemandeListComponent},
    {path:'notes-list',component:NotesListComponent},    
]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
