import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormatSettings } from '@progress/kendo-angular-dateinputs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public directionOfStudy: string[];
  public sex: string[];
  public users: User[];
  public addUserForm: FormGroup;
  public format: FormatSettings = {
    displayFormat: 'dd/MM/yyyy',
    inputFormat: 'dd/MM/yy'
  };

  public startDateOfTrainingError: boolean;
  public endDateOfTrainingError: boolean;

  @Output() modalClose = new EventEmitter();

  constructor(private usersService: UsersService, private fb: FormBuilder) {
  }

  private initAddUserForm(): void {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15), this.UniqueNameValidator]],
      sex: ['', Validators.required],
      dateOfBirth: [''],
      directionOfStudy: ['', Validators.required],
      startDateOfTraining: [''],
      endDateOfTraining: ['']
    }, {validators: this.customValidators});

  }

  private customValidators = (formGroup: AbstractControl): void => {

    const endDateValidator = this.comparison('startDateOfTraining', 'dateOfBirth',
      (endDate, startDate, birthDate) => {
        if (!endDate) {
          return endDate >= startDate && endDate >= birthDate;
        } else {
          return true;
        }
      }
    );

    const startDateValidator = this.comparison('endDateOfTraining', 'dateOfBirth',
      (startDate, endDate, birthDate) => {
        if (!endDate) {
          return startDate >= birthDate && startDate <= endDate;
        } else {
          return startDate >= birthDate;
        }
      }
    );

    const birthDateValidator = this.comparison('endDateOfTraining', 'dateOfBirth',
      (startDate, endDate, birthDate) => {
        if (!endDate) {
          return startDate >= birthDate && birthDate <= endDate;
        } else {
          return startDate >= birthDate;
        }
      }
    );

    const FRONTEND_DIRECTION_OF_STUDY = 'Frontend';
    const BACKEND_DIRECTION_OF_STUDY = 'Backend';

    formGroup.get('dateOfBirth').setValidators([birthDateValidator, Validators.required]);
    formGroup.get('startDateOfTraining').setValidators([startDateValidator, Validators.required]);

    if (formGroup.get('directionOfStudy').value === FRONTEND_DIRECTION_OF_STUDY || formGroup.get('directionOfStudy').value === BACKEND_DIRECTION_OF_STUDY) {
      formGroup.get('endDateOfTraining').clearValidators();
      formGroup.get('endDateOfTraining').setValidators([endDateValidator]);
    } else {
      formGroup.get('endDateOfTraining').setValidators([endDateValidator, Validators.required]);
    }

    formGroup.get('directionOfStudy').valueChanges.subscribe(() => {
      if (formGroup.get('directionOfStudy').value === FRONTEND_DIRECTION_OF_STUDY || formGroup.get('directionOfStudy').value === BACKEND_DIRECTION_OF_STUDY) {
        formGroup.get('endDateOfTraining').clearValidators();
        formGroup.get('endDateOfTraining').setValidators([endDateValidator]);
      } else {
        formGroup.get('endDateOfTraining').clearValidators();
        formGroup.get('endDateOfTraining').setValidators([endDateValidator, Validators.required]);
      }
    });
  };

  private comparison(firstField: string, secondField: string, predicate: (fieldVal, firstFieldToCompare, secondFieldToCompare) => boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const group = control.parent;
      const firstFieldToCompare = group.get(firstField);
      const secondFieldToCompare = group.get(secondField);
      const valid = predicate(control.value, firstFieldToCompare.value, secondFieldToCompare.value);
      return valid ? null : {comparison: {value: control.value}};
    };
  }

  private UniqueNameValidator = (formControl: FormControl): null | string =>
    this.users.map(user => user.name).includes(formControl.value)
      ? 'Please enter correct name'
      : null;

  private initUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  private initSex(): void {
    this.sex = this.usersService.getSex();
  }

  private initDirectionOfStudy(): void {
    this.directionOfStudy = this.usersService.getDirectionOfStudy();
  }

  ngOnInit(): void {
    this.initDirectionOfStudy();
    this.initSex();
    this.initUsers();
    this.initAddUserForm();
  }

  public submit(): void {
    if (this.addUserForm.valid) {
      this.usersService.addUser(this.addUserForm.value);
      this.modalClose.emit();
    } else {
      this.addUserForm.markAsUntouched();
      this.addUserForm.markAllAsTouched();
    }
  }

  public closeModal(): void {
    this.modalClose.emit();
  }
}

