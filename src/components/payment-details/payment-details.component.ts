import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  collection,
  getFirestore,
  onSnapshot,
  where,
  query,
  writeBatch,
} from 'firebase/firestore';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AuthenticationService } from '../services/authentication.service';
import { MarketService } from '../services/market.service';
import { ModalComponent } from './modalComponent';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss'],
})
export class PaymentDetailsComponent implements OnInit {
  uid: any;
  userName: any;
  db: any;
  data: any;
  isEnabled: any;
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    public exhibitionService: MarketService,
    private route: ActivatedRoute,
    private modalService: MdbModalService
  ) {
    this.db = getFirestore();
    this.uid = this.route.snapshot.paramMap.get('id');
    onSnapshot(
      query(
        collection(this.db, 'payment'),
        where('uuid', '!=', this.uid)
        // where('status', '==', 'pending')
      ),
      (snapShot: any) => {
        const datas = snapShot.docs.map((document: any) => document.data());
        const artypes = snapShot.docs.map(
          (document: any) => document.data().artType
        );
        const sizes = snapShot.size;
        this.data = datas;
      }
    );
  }
  ngOnInit(): void {}

  openModal(transactionId: any, uuid: any) {
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-lg',
      data: {
        title: 'Custom title',
        transactionId: transactionId,
        uuid: uuid,
      },
      keyboard: true,
      backdrop: true,
    });
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }

  // approveExhibition(exhibitionUid: any): void {
  //   const batch = doc(this.db, 'exhibition', exhibitionUid);
  //   setDoc(batch, { isEnabled: true }, { merge: true })
  //     .then(() => {
  //       alert('Exhibition is now availabe to be viewed ');
  //     })
  //     .catch((error) => {
  //       alert('unable to update the exhibition');
  //       alert(error);
  //     });
  // }

  // onDisable(exhibitionUid: any) {
  //   this.modalRef = this.modalService.open(onDisableExhibitionModal, {
  //     modalClass: 'modal-lg',
  //     data: { exhibitionUid: `${exhibitionUid}` },
  //     keyboard: true,
  //     backdrop: true,
  //   });
  //   this.modalRef.onClose.subscribe((message: any) => {
  //     console.log(message);
  //   });
  // }
}
