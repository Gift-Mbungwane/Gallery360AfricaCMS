import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ɵNgNoValidate } from '@angular/forms';
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
  userName!: string;
  uid: any;
  datas: any;
  db: any;
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
      modalClass: 'modal-dialog-centered',
      data: { title: 'Custom title', artUrl: `${artUrl}` },
      keyboard: true,
      backdrop: true,
    });
  }

  approveArtist(artistUid: any) {
    const batch = doc(this.db, 'artists', artistUid);
    setDoc(batch, { isEnabled: true }, { merge: true })
      .then(() => {
        alert('Artist is Diplayed under Artist');
      })
      .catch((error) => {
        alert('unable to update the');
      });
  }

  onDisable(artistUid: any) {
    this.modalRef = this.modalService.open(onDisableArtistModal, {
      modalClass: 'modal-dialog-centered',
      data: { title: 'Custom title', artistUid: `${artistUid}` },
      keyboard: true,
      backdrop: true,
    });
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }
}


/**
 * 
 * <vm-player controls>
  <vm-video cross-origin="true" poster="https://media.vimejs.com/poster.png">
    <!-- These are passed directly to the underlying HTML5 `<video>` element. -->
    <!-- Why `data-src`? Lazy loading, you can always use `src` if you prefer.  -->
    <!-- <source src="ho.mp4" type="video/mp4">
    <source src="ho.ogg" type="video/ogg" > -->
    <source data-src="{{data.introductionVideo || 'https://media.vimejs.com/720p.mp4'}}" type="video/mp4" />
    <!-- <source data-src="{{data.introductionVideo.webm || 'https://media.vimejs.com/720p.mp4'}}" type="video/webm" /> -->
    <!-- <track
      default
      kind="subtitles"
      src="{{data.introductionVideo.mp4 || 'https://media.vimejs.com/720p.mp4'}}"
      srclang="en"
      label="English"
    /> -->
  </vm-video>
  <vm-default-ui no-click-to-play>
    <!-- We can place our own UI components here to extend the default UI. -->
    <vm-ui>
      <!-- Vime components. -->
      <vm-click-to-play></vm-click-to-play>
      <vm-spinner></vm-spinner>
      <vm-poster></vm-poster>
      <!-- Custom component. -->
      <!-- <tap-sides-to-seek></tap-sides-to-seek> -->
    </vm-ui>
  </vm-default-ui>
  <!-- ... -->
</vm-player>
 * 
 * */ 