import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './artist-disable-modal.component.html',
})
export class onDisableArtistModal implements OnInit {
  artistUid: String | null = null;
  db: any;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
    public route: ActivatedRoute,
    public modalRef: MdbModalRef<onDisableArtistModal>
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

  disApproveArtist(artistUid: any, message: String | any): void {
    if (message !== '' && artistUid !== '') {
      const batch = doc(this.db, 'artists', artistUid);
      setDoc(batch, { isEnabled: false, message: message }, { merge: true })
        .then(() => {
          this.close();
          alert('Art has been removed from Market');
        })
        .catch((error) => {
          alert('unable to update the');
        });
    } else {
      this.close();
      alert('Please add disapproving reason');
    }
  }
}
