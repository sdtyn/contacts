import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Contact } from 'src/app/model/contact.object';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { View } from '../../components/view.components';
import { ContactService } from 'src/app/model/services/contact.service';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/components/enums/app.enum';




@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent extends View implements OnInit, AfterViewInit {

  protected title = 'Contacts';

  protected contacts: Contact[];

  protected pageIndex = 0;
  protected itemsPerPage = 5;
  protected pageSize = 0;
  protected totalItems = 0;

  displayedColumns: string[] = ['id', 'name', 'surname', 'phone', 'birthdate', 'edit', 'delete'];
  dataSource: MatTableDataSource<Contact>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: ContactService,
              public cdRef: ChangeDetectorRef,
              public dialog: MatDialog,
              public router: Router) {
    super(dialog);
  }

  ngOnInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit() {
    this.getContactCount();
  }

  getContactCount() {
    this.service.getContactCount().subscribe(data => {
      if (data) {
        this.totalItems = data.count;
        this.pageSize = Math.ceil(this.totalItems / this.itemsPerPage);
        this.getContacts();
      } else {
        this.logWarning('NO CONTACT FOUND');
      }
    });
  }

  getContacts() {
    this.service.getAll((this.pageIndex * this.itemsPerPage), this.itemsPerPage).subscribe(data => {
      if (data) {
        const list: Array<any> = this.objectToArray(data);
        if (list && list.length > 0) {
          this.contacts = list;
          this.dataSource = new MatTableDataSource<Contact>(this.contacts);
        } else {
          this.logWarning('NO CONTACT FOUND');
        }
      } else {
        this.logWarning('NO CONTACT FOUND');
      }
    });
  }

  changePage(event) {
    this.itemsPerPage = event.previousPageIndex;
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.getContacts();
  }

  editContact(contact) {
    this.router.navigate([AppEnum.CREATE_UPDATE_CONTACT], {queryParams: {id: contact.id}});
  }

  deleteContact(contact) {
    this.service.delete(contact.id).subscribe(data => {
      if (data) {
        this.getContacts();
      } else {
        this.logWarning('NO CITY FOUND');
      }
    });
  }
}
