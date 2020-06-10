import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './views/contact-list/contact-list.component';
import { CreateUpdateContactComponent } from './views/create-update-contact/create-update-contact.component';
import { ErrorComponent } from './views/error/error.component';
import { AppEnum } from './components/enums/app.enum';


const routes: Routes = [
  { path: AppEnum.DEFAULT_PATH,           component: ContactListComponent },
  { path: AppEnum.CONTACT_LIST,           component: ContactListComponent },
  { path: AppEnum.CREATE_UPDATE_CONTACT,  component: CreateUpdateContactComponent },
  { path: AppEnum.ERROR,                  component: ErrorComponent },
  { path: AppEnum.OTHER_PATHS,            component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
