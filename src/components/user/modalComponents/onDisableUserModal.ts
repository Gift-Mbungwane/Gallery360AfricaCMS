import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './user-disable-modal.component.html',
})
export class onDisableUserModal implements OnInit {
  uid: String | null = null;
  db: any;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
    public route: ActivatedRoute,
    public modalRef: MdbModalRef<onDisableUserModal>
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

  disApproveArt(uid: any, message: String | any): void {
    if (message !== '' && uid !== '') {
      const batch = doc(this.db, 'users', uid);
      setDoc(batch, { isEnabled: false, message: message }, { merge: true })
        .then(() => {
          alert('This account is now suspended');
          this.close();
        })
        .catch((error) => {
          alert('unable to update the');
        });
    } else {
      alert('PLease add disapproving reason');
    }
  }
}
