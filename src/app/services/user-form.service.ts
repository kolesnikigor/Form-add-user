import { Injectable } from '@angular/core';

import { User, UserFormValue } from '../models/user';
import { DEFAULT_USER_FORM_STATE } from '../constants/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  private initialFormState: BehaviorSubject<UserFormValue> = new BehaviorSubject<UserFormValue>(DEFAULT_USER_FORM_STATE);
  private isFormForEdit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getFormStatus(): Observable<boolean> {
    return this.isFormForEdit.asObservable();
  }

  public getInitialFormState(): Observable<UserFormValue> {
    return this.initialFormState.asObservable();
  }

  public setInitialFormState(initState: User): void {
    this.initialFormState.next(Utils.setInitialFormStateFromUserData(initState));
  }

  public setDefaultInitialFormState(): void {
    this.initialFormState.next(DEFAULT_USER_FORM_STATE);
  }

  public changeFormStatus(status: boolean): void {
    this.isFormForEdit.next(status);
  }

}
