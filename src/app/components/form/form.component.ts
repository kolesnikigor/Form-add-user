import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { User, ValueBindingItem } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { FormatSettings } from '@progress/kendo-angular-dateinputs';
import { CustomValidator } from '../../validators/customValidators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public directionOfStudy: ValueBindingItem[] = [
    {text: 'Backend', value: 'backend'},
    {text: 'Frontend', value: 'frontend'},
    {text: 'Design', value: 'design'},
    {text: 'Project Management', value: 'projectManagement'},
    {text: 'Quality Assurance', value: 'qualityAssurance'},
    {text: 'Business Analytic', value: 'businessAnalytic'}
  ];
  public sex: ValueBindingItem[] = [
    {text: 'Male', value: 'male'},
    {text: 'Female', value: 'female'},
  ];
  public users: User[];
  public addUserForm: FormGroup;
  public format: FormatSettings = {
    displayFormat: 'dd/MM/yyyy',
    inputFormat: 'dd/MM/yy'
  };

  @Output() modalClose = new EventEmitter();

  constructor(private usersService: UsersService, private fb: FormBuilder) {
  }

  private initAddUserForm(): void {
    this.addUserForm = this.fb.group({
      name: ['', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
          this.uniqueNameValidator
        ]
      }],
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
      endDateOfTraining: ['', []]
    });
  }

  private setValidatorsDependency = () => {
    const FRONTEND_DIRECTION_OF_STUDY = 'frontend';
    const BACKEND_DIRECTION_OF_STUDY = 'backend';

    this.addUserForm.get('directionOfStudy').valueChanges.subscribe(value => {
      // this.addUserForm.get('endDateOfTraining').clearValidators();
      if (value === FRONTEND_DIRECTION_OF_STUDY || value === BACKEND_DIRECTION_OF_STUDY) {
        this.addUserForm.get('endDateOfTraining').setValidators([
          CustomValidator.mustBeGreaterThanFieldToCompare('startDateOfTraining'),
          CustomValidator.mustBeGreaterThanFieldToCompare('dateOfBirth')
        ]);
      } else {
        this.addUserForm.get('endDateOfTraining').setValidators([
          Validators.required,
          CustomValidator.mustBeGreaterThanFieldToCompare('startDateOfTraining'),
          CustomValidator.mustBeGreaterThanFieldToCompare('dateOfBirth')
        ]);
      }
    });
  };

  private uniqueNameValidator = (formControl: FormControl): { [key: string]: any } | null =>
    this.users.map(user => user.name).includes(formControl.value)
      ? {uniqueName: 'This name is already taken'}
      : null;

  private initUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  ngOnInit(): void {
    this.initUsers();
    this.initAddUserForm();
    this.setValidatorsDependency();
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


