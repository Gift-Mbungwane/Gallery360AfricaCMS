import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  template: `
    <div class="modal-content">
      <div class="modal-header">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          (click)="close()"
        ></button>
      </div>
      <div class="modal-body">
        <img src="{{ artUrl }}" style="width:calc(98vw - 480px);" />
      </div>
      <!--
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="close()">
          Close
        </button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
      -->
    </div>
  `,
})
export class ModalComponent implements OnInit {
  artUrl: String | null = null;
  title: string | null = null;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
    public route: ActivatedRoute,
    public modalRef: MdbModalRef<ModalComponent>
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage);
  }
}