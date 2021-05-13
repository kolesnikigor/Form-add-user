import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { User } from '../models/user';

export class CustomValidator {

  public static uniqueNameValidator(users: User[]): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null =>
      users.map(user => user.name).includes(control.value)
        ? {uniqueName: true}
        : null;
  }

  public static mustBeGreaterThanFieldToCompare(fieldToCompare: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.parent) {
        const fieldToCompareVal = control.parent.get(fieldToCompare).value;
        const valid = control.value >= fieldToCompareVal;
        return valid ? null : {mustBeGreater: true};
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
        return valid ? null : {mustBeLess: true};
      } else {
        return null;
      }
    };
  }

}
