import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public users: User[];

  constructor(private usersService: UsersService) {
  }

  private initUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  public ngOnInit(): void {
    this.initUsers();
  }
}
