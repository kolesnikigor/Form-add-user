import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidator {

  public static mustBeGreaterThanFieldToCompare(fieldToCompare: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.parent) {
        const fieldToCompareVal = control.parent.get(fieldToCompare).value;
        const valid = control.value >= fieldToCompareVal;
        return valid ? null : {mustBeGreater: {value: control.value}};
      } else {
        return null;
      }
    };
  }

  public static mustBeLessThanFieldToCompare(fieldToCompare: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.parent) {
        const fieldToCompareVal = control.parent.get(fieldToCompare).value;
        const valid = control.value <= fieldToCompareVal;
        return valid ? null : {mustBeLess: {value: control.value}};
      } else {
        return null;
      }
    };
  }

}
