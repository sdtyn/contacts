import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatTableModule,
  MatPaginatorModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUpdateContactComponent } from './views/create-update-contact/create-update-contact.component';
import { ContactListComponent } from './views/contact-list/contact-list.component';
import { ErrorComponent } from './views/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneDirective } from './components/directives/phone/phone.directive';
import { ContactService } from './model/services/contact.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './components/dialog/dialog.component';
import { LangPipe } from './components/pipes/lang.pipe';
import { NameDirective } from './components/directives/name/name.directive';

@NgModule({
  declarations: [
    AppComponent,
    CreateUpdateContactComponent,
    ContactListComponent,
    ErrorComponent,
    PhoneDirective,
    NameDirective,
    DialogComponent,
    LangPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent
  ]
})
export class AppModule { }
