import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layuot',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  public modalOpened = true;

  constructor() {
  }

  public modalClose(): void {
    this.modalOpened = false;
  }

  public modalOpen(): void {
    this.modalOpened = true;
  }

  ngOnInit(): void {
  }

}
