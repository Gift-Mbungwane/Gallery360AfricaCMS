import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
} from 'firebase/firestore';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { onDisableArtistModal } from './modalComponents/onDisableArtistModal';
import { AuthenticationService } from '../services/authentication.service';
import { ModalComponent } from './modalComponent';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  userName: any;
  uid: any;
  datas: any;
  db: any;
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private modalService: MdbModalService
  ) {
    this.db = getFirestore();
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.userName = this.route.snapshot.paramMap.get('userName');
  }

  ngOnInit(): void {
    onSnapshot(
      query(
        collection(this.db, 'artists')
        // where('uid', '!=', this.uid),
        // where('status', '==', 'pending')
      ),
      (snapShot) => {
        const data = snapShot.docs.map((doc) => doc.data());
        this.datas = data;
      }
    );
  }

  openModal(artUrl: any) {
    this.modalService.open(ModalComponent, {
      modalClass: 'modal-lg',
      data: { title: 'Custom title', artUrl: `${artUrl}` },
      keyboard: true,
      backdrop: true,
    });
  }

  approveArt(ImageUid: any): void {
    const batch = doc(this.db, 'artists', ImageUid);
    setDoc(batch, { isEnabled: true }, { merge: true })
      .then(() => {
        alert('Artist is Diplayed under Artist');
      })
      .catch((error) => {
        alert('unable to update the');
      });
  }

  disApproveArt(ImageUid: any, message: String | any): void {
    const batch = doc(this.db, 'artists', ImageUid);
    setDoc(batch, { isEnabled: false }, { merge: true })
      .then(() => {
        alert('Art has been removed from Market');
      })
      .catch((error) => {
        alert('unable to update the');
      });
  }

  onDisable(ImageUid: any) {
    this.modalRef = this.modalService.open(onDisableArtistModal, {
      modalClass: 'modal-lg',
      data: { title: 'Custom title', ImageUid: `${ImageUid}` },
      keyboard: true,
      backdrop: true,
    });
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }
}
