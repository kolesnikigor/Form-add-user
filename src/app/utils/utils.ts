import { User, UserFormValue } from '../models/user';

export class Utils {
  public static createUserId(users: User[]): number {
    let nweUserId: number;
    for (let i = 0; ; i++) {
      nweUserId = i;
      if (!users.find((user) => user.id === i)) {
        break;
      }
    }
    return nweUserId;
  }

  public static setInitialFormStateFromUserData(userData: User): UserFormValue {
    return {
      id: userData.id,
      name: userData.name,
      sex: userData.sex.value,
      dateOfBirth: new Date(userData.dateOfBirth),
      directionOfStudy: userData.directionOfStudy.value,
      startDateOfTraining: new Date(userData.startDateOfTraining),
      endDateOfTraining: new Date(userData.endDateOfTraining),
    };
  }
}
