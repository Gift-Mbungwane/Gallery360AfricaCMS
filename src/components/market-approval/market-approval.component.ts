import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AuthenticationService } from '../services/authentication.service';
import { ModalComponent } from './modalComponent';
import { onDisableModal } from '../modalComponents/onDisableModal';

@Component({
  selector: 'app-market-approval',
  templateUrl: './market-approval.component.html',
  styleUrls: ['./market-approval.component.scss'],
})
export class MarketApprovalComponent implements OnInit {
  userName: any;
  uid: any;
  datas: any;
  db: any;
  isEnabled: any;
  isColor!: boolean;
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private modalService: MdbModalService
  ) {
    this.db = getFirestore();
    this.uid = this.route.snapshot.paramMap.get('id');
    if (this.uid != '' && this.uid != null) {
      this.isColor = true;
    }

    console.log(this.uid);
  }

  ngOnInit(): void {
    onSnapshot(
      query(
        collection(this.db, 'Market')
        // where('uid', '!=', this.uid),
        // where('status', '==', 'pending')
      ),
      (snapShot) => {
        const data = snapShot.docs.map((doc) => doc.data());
        this.datas = data;
        const enabling = snapShot.docs.map((doc) => doc.data().isEnabled);
        this.isEnabled = enabling;
      }
    );
  }
  approveArt(ImageUid: any): void {
    const batch = doc(this.db, 'Market', ImageUid);
    setDoc(batch, { isEnabled: true }, { merge: true })
      .then(() => {
        alert('Image is now availabe on Market');
      })
      .catch((error) => {
        alert('unable to update the');
      });
  }

  openModal(artUrl: any) {
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-lg',
      data: { title: 'Custom title', artUrl: `${artUrl}` },
      keyboard: true,
      backdrop: true,
    });
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }

  onDisable(ImageUid: any) {
    this.modalRef = this.modalService.open(onDisableModal, {
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
