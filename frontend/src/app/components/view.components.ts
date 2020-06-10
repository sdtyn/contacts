import { Logger } from './logger.components';
import { FormGroup } from '@angular/forms';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

export class View extends Logger {

    constructor(public dialog: MatDialog) {
        super();
    }

    objectToArray(array) {
        let resultArray = [];
        if (array) {
            resultArray = Object.keys(array).map( index => {
                return array[index];
            });
        }
        return resultArray;
    }

    scrollTo(el: Element): void {
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }

    scrollToError(): void {
        const formElements = document.querySelectorAll('mat-form-field');
        if (formElements) {
            for (const key in formElements) {
                if (formElements.hasOwnProperty(key)) {
                    const element = formElements[key];
                    if (element.classList.contains('ng-invalid')) {
                        this.scrollTo(element);
                        break;
                    }
                }
            }
        }
    }

    async scrollIfFormHasErrors(form: FormGroup): Promise <any> {
        await form.invalid;
        this.scrollToError();
    }

    openDialog(contentParam: string) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: 1,
            content: contentParam
        };

        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => console.log('Dialog output:', dialogConfig.data)
        );
    }

    closeDialog() {
        this.dialog.closeAll();
    }
}
