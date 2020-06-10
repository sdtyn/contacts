import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact.object';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ContactService } from 'src/app/model/services/contact.service';
import { View } from '../../components/view.components';
import { CustomFormControl } from '../../components/forms/form.control';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppEnum } from 'src/app/components/enums/app.enum';
import { RegexEnum } from 'src/app/components/enums/regex.enum';

@Component({
  selector: 'app-create-update-contact',
  templateUrl: './create-update-contact.component.html',
  styleUrls: ['./create-update-contact.component.scss']
})
export class CreateUpdateContactComponent extends View implements OnInit {

  protected contact: Contact = new Contact();

  protected contacts: Array<any>;

  protected contactForm: FormGroup;

  protected cities: any;
  protected streets: any;

  protected maxBirthdate: Date;
  protected minBirthdate: Date;

  constructor(private formBuilder: FormBuilder,
              private service: ContactService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) {
    super(dialog);
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      id: new CustomFormControl(''),
      name: new CustomFormControl('', [Validators.required, Validators.pattern(RegexEnum.names)]),
      surname: new CustomFormControl('', [Validators.required, Validators.pattern(RegexEnum.names)]),
      phone: new CustomFormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(21)]),
      birthdate: new CustomFormControl('', [Validators.required]),
      postalCode: new CustomFormControl('', [Validators.required, Validators.pattern(RegexEnum.postalCode)]),
      city: new CustomFormControl('', [Validators.required]),
      street: new CustomFormControl('', [Validators.required]),
      houseNumber: new CustomFormControl('', [Validators.required, Validators.pattern(RegexEnum.houseNumber)])
    });
    this.setMaxAndMinBirthDates();

    this.route.queryParams.subscribe(params => {
        this.contact.id = params.id;
        if (this.contact.id) {
          this.getContactById();
        }
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.contactForm.controls[controlName].hasError(errorName);
  }

  setMaxAndMinBirthDates() {
    this.maxBirthdate = new Date((new Date().getFullYear() - 18), new Date().getMonth(), new Date().getDate());
    this.minBirthdate = new Date((new Date().getFullYear() - 121), new Date().getMonth(), new Date().getDate());
  }

  getContactById() {
    this.service.getContactById(this.contact.id).subscribe(data => {
      if (data) {
        this.contact = data;
        this.contactForm.patchValue(this.contact);
        this.getStreets(this.contact.postalCode, this.contact.city);
      } else {
        this.logWarning('NO CITY FOUND');
      }
    });
  }

  searchFieldKeyDown(event) {
    if (event) {
      if (event.keyCode === 13) {
        this.searchContact(event.target.value);
      } else {
        if (this.contact.id) {
          this.clearView();
          this.router.navigate([AppEnum.CREATE_UPDATE_CONTACT]);
        } else {
          this.clearView();
        }
      }
    }
  }

  searchContact(searchedText) {
    this.service.getContactsByName(searchedText).subscribe(data => {
      const list: Array<any> = this.objectToArray(data);
      if (list && list.length > 0) {
        this.contacts = list;
      } else {
        this.logWarning('NO CITY FOUND');
      }
    });
  }

  selectAContact(event: any) {
    this.contact = event.option.value;
    this.contactForm.patchValue(this.contact);
    this.contacts = null;
    if (this.contact.postalCode &&  this.contact.city) {
      this.getStreets(this.contact.postalCode,  this.contact.city);
    }
  }

  getFullName() {
    if (this.contact && this.contact.id && this.contact.surname) {
      return this.contact.name + ' ' + this.contact.surname;
    }
  }

  postalCodeChange(event) {
    this.cityChange(null);
    this.contact.postalCode = event.target.value;
    if (this.contactForm.controls.postalCode.valid) {
      this.cities = null;
      this.service.getCities(this.contact.postalCode).subscribe(data => {
        const list: Array<any> = this.objectToArray(data);
        if (list && list.length > 0) {
          this.cities = list;
          if (this.cities.length === 1) {
            this.cityChange(this.cities[0].name);
          } else {
            // TODO: if more than one city found
          }
        } else {
          this.logWarning('NO CITY FOUND');
        }
      });
    } else {
      this.cities = null;
    }
  }

  cityChange(city: string){
    this.contact.city = city;
    if (this.contact.city) {
      this.contactForm.patchValue({city: this.contact.city});
      this.getStreets(this.contact.postalCode, this.contact.city);
    } else {
      this.streets = null;
    }
  }

  getStreets(postalCode: string, city: string) {
    this.service.getStreets(postalCode, city).subscribe(data => {
      if (data) {
        const list: Array<any> = this.objectToArray(data);
        if (list && list.length > 0) {
          this.streets = list;
        } else {
          this.logWarning('NO STREET FOUND');
        }
      } else {
        this.logWarning('NO STREET FOUND');
      }
    });
  }

  clearView() {
    this.contact = new Contact();
    this.cities = null;
    this.streets = null;
    this.contactForm.reset();
    this.contactForm.patchValue(this.contact);
    setTimeout(() => {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key).setErrors(null) ;
      });
    }, 100);
  }

  submit() {
    if (this.contactForm.valid) {
      this.contact = this.contactForm.value;
      if (this.contact.id) {
        this.updateContact();
      } else {
        this.createContact();
      }
    } else {
      this.scrollIfFormHasErrors(this.contactForm);
    }
  }

  createContact() {
    this.service.create(this.contact).subscribe(data => {
      if (data && data.id) {
        this.clearView();
        this.openDialog('Your contact has been created');
      } else {
        this.logError('The datas cannot saved');
      }
    });
  }

  updateContact() {
    this.service.update(this.contact).subscribe(data => {
      if (data) {
        this.clearView();
        this.openDialog(String(data.message));
      } else {
        this.logError('The datas cannot saved');
      }
    });
  }

}
