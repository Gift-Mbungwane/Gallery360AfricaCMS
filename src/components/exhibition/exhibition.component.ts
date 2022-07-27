import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AuthenticationService } from '../services/authentication.service';
import { MarketService } from '../services/market.service';
import { ModalComponent } from './modalComponent';
import { onDisableExhibitionModal } from './modalComponents/onDisableExhibitionModal';

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.component.html',
  styleUrls: ['./exhibition.component.scss'],
})
export class ExhibitionComponent implements OnInit {
  uid: any;
  userName: any;
  db: any;
  datas: any;
  isEnabled: any;
  modalRef: MdbModalRef<ModalComponent> | null = null;
  isColor!: boolean;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    public exhibitionService: MarketService,
    private route: ActivatedRoute,
    private modalService: MdbModalService
  ) {
    this.db = getFirestore();
    this.uid = this.route.snapshot.paramMap.get('id');
    if (this.uid != '' && this.uid != null) {
      this.isColor = true;
    }
  }
  ngOnInit(): void {
    onSnapshot(
      query(
        collection(this.db, 'exhibition')
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

  openModal(exhibitionImage: any) {
    this.modalService.open(ModalComponent, {
      modalClass: 'modal-lg',
      data: { title: 'Custom title', exhibitionImage: `${exhibitionImage}` },
      keyboard: true,
      backdrop: true,
    });
  }

  approveExhibition(exhibitionUid: any): void {
    const batch = doc(this.db, 'exhibition', exhibitionUid);
    setDoc(batch, { isEnabled: true }, { merge: true })
      .then(() => {
        alert('Exhibition is now availabe to be viewed ');
      })
      .catch((error) => {
        alert('unable to update the exhibition');
        alert(error);
      });
  }

  onDisable(exhibitionUid: any) {
    this.modalRef = this.modalService.open(onDisableExhibitionModal, {
      modalClass: 'modal-lg',
      data: { exhibitionUid: `${exhibitionUid}` },
      keyboard: true,
      backdrop: true,
    });
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }
}
