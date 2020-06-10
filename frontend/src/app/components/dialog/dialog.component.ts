import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'dialog-component',
    templateUrl: 'dialog.component.html'
})
export class DialogComponent {

    content: string;

    constructor(
        private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.content = data.content;
    }

    close() {
        this.dialogRef.close();
    }
}
