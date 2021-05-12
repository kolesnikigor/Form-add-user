import { DirectionOfStudy, Sex, User } from '../models/user';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


export class UsersService {
  private users: User[] = [
    {
      name: 'User',
      sex: 'male',
      dateOfBirth: '07/05/2000',
      directionOfStudy: 'qualityAssurance',
      startDateOfTraining: '07/03/2021',
      endDateOfTraining: '07/05/2021',
    },
    {
      name: 'FirstUser',
      sex: 'male',
      dateOfBirth: '07/05/2000',
      directionOfStudy: 'qualityAssurance',
      startDateOfTraining: '07/03/2021',
      endDateOfTraining: '07/05/2021',
    },
    {
      name: 'SecondUser',
      sex: 'male',
      dateOfBirth: '07/05/2000',
      directionOfStudy: 'qualityAssurance',
      startDateOfTraining: '07/03/2021',
      endDateOfTraining: '07/05/2021',
    }
  ];

  public getUsers(): Observable<User[]> {
    return of<User[]>(this.users)
      .pipe(map(users => {
          users.map(user => {
            Sex[user.sex] && (user.sex = Sex[user.sex]);
            DirectionOfStudy[user.directionOfStudy] && (user.directionOfStudy = DirectionOfStudy[user.directionOfStudy]);
          });
          return users;
        }
      ));
  }

  public getDirectionOfStudy(): string[] {
    return Object.values(DirectionOfStudy);
  }

  public getSex(): string[] {
    return Object.values(Sex);
  }

  addUser(data: User): void {
    this.users.push({
      name: data.name,
      sex: Object.keys(Sex).find(key => Sex[key] === data.sex),
      dateOfBirth: new DatePipe('en-US').transform(data.dateOfBirth, 'dd/MM/yyyy'),
      directionOfStudy: Object.keys(DirectionOfStudy).find(key => DirectionOfStudy[key] === data.directionOfStudy),
      startDateOfTraining: new DatePipe('en-US').transform(data.startDateOfTraining, 'dd/MM/yyyy'),
      endDateOfTraining: new DatePipe('en-US').transform(data.endDateOfTraining, 'dd/MM/yyyy'),
    });
  }

  constructor() {
  }
}
