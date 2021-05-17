import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { ModalService } from '../../services/modal.service';
import { UserFormService } from '../../services/user-form.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public users: User[];

  constructor(
    private usersService: UsersService,
    private modalService: ModalService,
    private usersFormService: UserFormService) {
  }

  public ngOnInit(): void {
    this.initUsers();
  }

  private initUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  public addHandler(): void {
    this.modalService.modalOpen();
    this.usersFormService.changeFormStatus(false);
    this.usersFormService.setDefaultInitialFormState();
  }

  public removeHandler({dataItem}): void {
    this.usersService.removeUser(dataItem.id);
    this.initUsers();
  }

  public editHandler({dataItem}): void {
    this.modalService.modalOpen();
    this.usersFormService.changeFormStatus(true);
    this.usersFormService.setInitialFormState(dataItem);
  }
}
