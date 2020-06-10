import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appName]'
})
export class NameDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(newVal, backspace) {
    if (newVal && newVal.length > 1) {
      newVal = newVal.toLowerCase();
      newVal = newVal.charAt(0).toUpperCase() + newVal.substring(1, newVal.length);
      this.ngControl.valueAccessor.writeValue(newVal);
    }
  }
}
