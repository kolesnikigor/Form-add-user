import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  public isModalOpened: boolean;
  // public isFormForEdit = false;

  constructor(private modalService: ModalService) {
  }

  public ngOnInit(): void {
    this.getModalStatus();
  }

  // public changeFormStatus(status: boolean): void {
  //   this.isFormForEdit = status;
  // }

  private getModalStatus(): void {
    this.modalService.getModalStatus().subscribe(isModalOpened => {
      this.isModalOpened = isModalOpened;
    });
  }

  public modalClose(): void {
    this.modalService.modalClose();
  }
}
