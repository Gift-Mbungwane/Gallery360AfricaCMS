import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  template: `
    <div class="modal-content modal" >
        <img
          class="rounded"
          style="width: 100%"
          src="{{ exhibitionImage }}"
        />
    </div>
  `,
    styleUrls: ['./exhibition.component.scss'],
})
export class ModalComponent implements OnInit {
  exhibitionImage: String | null = null;
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
