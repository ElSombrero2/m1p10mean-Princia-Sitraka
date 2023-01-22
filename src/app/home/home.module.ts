import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ListVoitureComponent } from './pages/voiture/list-voiture/list-voiture.component';
import { DetailVoitureComponent } from './pages/voiture/detail-voiture/detail-voiture.component';
import { ValidationComponent } from './pages/voiture/validation/validation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DepotComponent } from './pages/voiture/depot/depot.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    HomeComponent,
    AccueilComponent,
    ListVoitureComponent,
    DetailVoitureComponent,
    DepotComponent,
    ValidationComponent,
    ConfirmDialogComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule
    ]
})
export class HomeModule { }
