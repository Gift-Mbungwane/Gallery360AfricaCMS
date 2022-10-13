import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './exhibition-disable-modal.component.html',
})
export class onDisableExhibitionModal implements OnInit {
  exhibitionUid: String | null = null;
  db: any;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
    public route: ActivatedRoute,
    public modalRef: MdbModalRef<onDisableExhibitionModal>
  ) {
    this.db = getFirestore();
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  messageFormControl = new FormControl('', [
    Validators.required,
    Validators.min(5),
  ]);

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage);
  }

  disApproveExhibition(exhibitionUid: any, message: String | any): void {
    if (message !== '' && exhibitionUid !== '') {
      const batch = doc(this.db, 'exhibition', exhibitionUid);
      setDoc(batch, { isEnabled: false, message: message }, { merge: true })
        .then(() => {
          this.close();
          alert('Exhibition has been removed from Exhibition list');
        })
        .catch((error) => {
          this.close();
          alert('unable to remove exhibition');
        });
    } else {
      this.close();
      alert('Please add disapproving reason');
    }
  }
}
