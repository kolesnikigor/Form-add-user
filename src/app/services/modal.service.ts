import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public isModalOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getModalStatus(): Observable<boolean> {
    return this.isModalOpened.asObservable();
  }

  public modalClose(): void {
    this.isModalOpened.next(false);
  }

  public modalOpen(): void {
    this.isModalOpened.next(true);
  }
}
