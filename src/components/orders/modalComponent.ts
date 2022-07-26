import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  template: `
    <div class="modal-content" style="width:calc(100vw - 480px);">
      <!-- <div class="modal-header">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          (click)="close()"
        ></button>
      </div> -->
      <div>
        <img
          class="rounded"
          style="width:calc(100vw - 480px);height: 90vh;"
          src="{{ artUrl }}"
        />
        <div class="card-img-overlay item-infor-modal">
          <p class="item-detail-modal item">{{ artistName }}</p>
          <p class="item-detail-modal item">{{ artName }}</p>
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
    </div>
  `,
  styleUrls: ['./orders.component.scss'],
})
export class ModalComponent implements OnInit {
  artUrl: String | null = null;
  title: string | null = null;
  artistName: string | null = null;
  artName: string | null = null;

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
