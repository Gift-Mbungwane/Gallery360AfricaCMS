import { Component, OnInit } from '@angular/core';
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
import { AuthenticationService } from '../services/authentication.service';
import { ModalComponent } from './modalComponent';
import { onDisableUserModal } from './modalComponents/onDisableUserModal';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  uid: any;
  userName: any;
  db: any;
  datas: any;
  isEnabled: any;
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
        collection(this.db, 'users')
        // where('uid', '!=', this.uid),
        // where('status', '==', 'pending')
      ),
      (snapShot) => {
        const data = snapShot.docs.map((doc) => doc.data());
        this.datas = data;
      }
    );
  }

  approveUser(uid: any): void {
    const batch = doc(this.db, 'users', uid);
    setDoc(batch, { isEnabled: true }, { merge: true })
      .then(() => {
        alert('User is now enabled to view the gallery-360-africa app');
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

  onDisable(uid: any) {
    this.modalRef = this.modalService.open(onDisableUserModal, {
      modalClass: 'modal-lg',
      data: { title: 'Custom title', uid: `${uid}` },
      keyboard: true,
      backdrop: true,
    });
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }
}
