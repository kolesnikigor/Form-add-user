import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
          CustomValidator.uniqueNameValidator(this.users)
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
    const defaultValidators = [
      CustomValidator.mustBeGreaterThanFieldToCompare('startDateOfTraining'),
      CustomValidator.mustBeGreaterThanFieldToCompare('dateOfBirth')
    ];

    this.addUserForm.get('directionOfStudy').valueChanges.subscribe(value => {
      this.addUserForm.get('endDateOfTraining').clearValidators();
      if (value === FRONTEND_DIRECTION_OF_STUDY || value === BACKEND_DIRECTION_OF_STUDY) {
        if (!this.addUserForm.get('endDateOfTraining').value) {
          this.addUserForm.get('startDateOfTraining').clearValidators();
          this.addUserForm.get('startDateOfTraining').setValidators([CustomValidator.mustBeGreaterThanFieldToCompare('dateOfBirth')]);
          this.addUserForm.get('dateOfBirth').clearValidators();
          this.addUserForm.get('dateOfBirth').setValidators([CustomValidator.mustBeLessThanFieldToCompare('startDateOfTraining')]);
        } else {
          this.addUserForm.get('endDateOfTraining').setValidators([...defaultValidators]);
        }
      } else {
        this.addUserForm.get('endDateOfTraining').setValidators([Validators.required, ...defaultValidators]);
      }
      this.addUserForm.get('endDateOfTraining').updateValueAndValidity({emitEvent: false});
    });

    const updateValidity = (fields: string[]): void =>
      fields.forEach((field) => this.addUserForm.get(field).updateValueAndValidity({emitEvent: false}));

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

  public ngOnInit(): void {
    this.initUsers();
    this.initAddUserForm();
    this.setValidatorsDependency();
  }

  public submit(): void {
    if (this.addUserForm.valid) {
      this.usersService.addUser(this.addUserForm.value);
      this.modalClose.emit();
    } else {
      this.addUserForm.markAllAsTouched();
    }
  }

  public closeModal(): void {
    this.modalClose.emit();
  }
}


