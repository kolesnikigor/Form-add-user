import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User, UserFormValue, ValueBindingItem } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { FormatSettings } from '@progress/kendo-angular-dateinputs';
import { CustomValidator } from '../../validators/customValidators';
import { ModalService } from '../../services/modal.service';
import { DIRECTION_OF_STUDY_TYPES, SEX_TYPES } from '../../constants/constants';
import { UserFormService } from '../../services/user-form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public directionOfStudy: ValueBindingItem[] = DIRECTION_OF_STUDY_TYPES;
  public sex: ValueBindingItem[] = SEX_TYPES;
  public users: User[];
  public addUserForm: FormGroup;
  public format: FormatSettings = {
    displayFormat: 'dd/MM/yyyy',
    inputFormat: 'dd/MM/yyyy'
  };
  private initialFormState: UserFormValue;
  public isFormForEdit: boolean;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private userFormService: UserFormService) {
  }

  public ngOnInit(): void {
    this.initUsers();
    this.getFormStatus();
    this.getInitialFormState();
    this.initAddUserForm();
    this.setValidatorsDependency();
  }

  private getFormStatus(): void {
    this.userFormService.getFormStatus().subscribe(isFormForEdit => {
      this.isFormForEdit = isFormForEdit;
    });
  }

  private getInitialFormState(): void {
    this.userFormService.getInitialFormState().subscribe(initState => {
      this.initialFormState = initState;
    });
  }

  private initAddUserForm(): void {
    this.addUserForm = this.fb.group({
      name: '',
      sex: ['', {validators: [Validators.required]}],
      dateOfBirth: ['', [
        Validators.required,
        CustomValidator.mustBeLessThanFieldToCompare('startDateOfTraining'),
        CustomValidator.mustBeLessThanFieldToCompare('endDateOfTraining')
      ]],
      directionOfStudy: ['', [Validators.required]],
      startDateOfTraining: ['', [
        Validators.required,
        CustomValidator.mustBeGreaterThanFieldToCompare('dateOfBirth'),
        CustomValidator.mustBeLessThanFieldToCompare('endDateOfTraining')
      ]],
      endDateOfTraining: ['', [
        Validators.required,
        CustomValidator.mustBeGreaterThanFieldToCompare('startDateOfTraining'),
        CustomValidator.mustBeGreaterThanFieldToCompare('dateOfBirth')
      ]]
    });
  }

  private setValidatorsDependency(): void {
    const FRONTEND_DIRECTION_OF_STUDY = 'frontend';
    const BACKEND_DIRECTION_OF_STUDY = 'backend';
    const defaultValidatorsForEndDateOfTraining = [
      CustomValidator.mustBeGreaterThanFieldToCompare('startDateOfTraining'),
      CustomValidator.mustBeGreaterThanFieldToCompare('dateOfBirth')
    ];
    const defaultValidatorsForName = [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15)
    ];
    const updateValidity = (fields: string[]): void =>
      fields.forEach((field) => this.addUserForm.get(field).updateValueAndValidity({emitEvent: false}));
    if (this.isFormForEdit) {
      this.addUserForm.get('name').setValidators([
        ...defaultValidatorsForName,
        CustomValidator.uniqueNameValidator(this.users.filter(user => user.id !== this.initialFormState.id))]);
      this.addUserForm.patchValue(this.initialFormState);
    } else {
      this.addUserForm.get('name').setValidators([...defaultValidatorsForName, CustomValidator.uniqueNameValidator(this.users)]);
    }
    this.addUserForm.get('directionOfStudy').valueChanges.subscribe(value => {
      this.addUserForm.get('endDateOfTraining').clearValidators();
      if (value === FRONTEND_DIRECTION_OF_STUDY || value === BACKEND_DIRECTION_OF_STUDY) {
        if (!this.addUserForm.get('endDateOfTraining').value) {
          this.addUserForm.get('startDateOfTraining').clearValidators();
          this.addUserForm.get('startDateOfTraining').setValidators([CustomValidator.mustBeGreaterThanFieldToCompare('dateOfBirth')]);
          this.addUserForm.get('dateOfBirth').clearValidators();
          this.addUserForm.get('dateOfBirth').setValidators([CustomValidator.mustBeLessThanFieldToCompare('startDateOfTraining')]);
        } else {
          this.addUserForm.get('endDateOfTraining').setValidators([...defaultValidatorsForEndDateOfTraining]);
        }
      } else {
        this.addUserForm.get('endDateOfTraining').setValidators([Validators.required, ...defaultValidatorsForEndDateOfTraining]);
      }
      updateValidity(['endDateOfTraining']);
    });

    this.addUserForm.get('dateOfBirth').valueChanges.subscribe(() => {
      updateValidity(['startDateOfTraining', 'endDateOfTraining']);
    });
    this.addUserForm.get('startDateOfTraining').valueChanges.subscribe(() => {
      updateValidity(['dateOfBirth', 'endDateOfTraining']);
    });
    this.addUserForm.get('endDateOfTraining').valueChanges.subscribe(() => {
      updateValidity(['dateOfBirth', 'startDateOfTraining']);
      this.addUserForm.get('directionOfStudy').updateValueAndValidity();
    });
  }

  private initUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  public submit(): void {
    if (this.addUserForm.valid) {
      if (this.isFormForEdit) {
        this.usersService.editUser(this.addUserForm.value, this.initialFormState.id);
      } else {
        this.usersService.addUser(this.addUserForm.value);
      }
      this.modalService.modalClose();
    } else {
      this.addUserForm.markAllAsTouched();
    }
  }

  public closeModal(): void {
    this.modalService.modalClose();
  }
}


