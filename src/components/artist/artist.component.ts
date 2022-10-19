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
import { videoCodec } from "@cloudinary/url-gen/actions/transcode";
import { auto, vp9 } from '@cloudinary/url-gen/qualifiers/videoCodec';
import {Cloudinary, CloudinaryVideo} from '@cloudinary/url-gen';

// Import required actions and qualifiers.
import {fill} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
import {Gravity} from "@cloudinary/url-gen/qualifiers";
import {AutoFocus} from "@cloudinary/url-gen/qualifiers/autoFocus";



@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  userName!: string;
  vid: CloudinaryVideo;
  uid: any;
  datas: any;
  db: any;
  isColor!: boolean;
  modalRef: MdbModalRef<ModalComponent> | null = null;
  sources = [
    {
        type: 'mp4',
        codecs: ['avc1.4d002a'],
        transcode: videoCodec(auto())
    },
    {
        type: 'webm',
        codecs: ['vp8', 'vorbis'],
        transcode: videoCodec(vp9())
    }];
  

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
        const cld = new Cloudinary({
          cloud: {
            cloudName: 'demo',
          }
        }); 

        

        const dataVideo = data.map((doc) => doc.introductionVideo);
        for(let i = 0; i <= dataVideo.length; i++) {
            // console.log(dataVideo[i]);
            this.vid = cld.video(`${dataVideo[i]}`);
        }
          // console.log(dataVideo.map(doc => doc));
    
        // Use the video with public ID, 'docs/walking_talking'.
        // 
      }
    );

    //
       // Create and configure your Cloudinary instance.
      
  
      // Apply the transformation.
      // this.vid.resize(fill().width(150).height(150)
      // .gravity(Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces())))) // Crop the video, focusing on the faces.
      // .roundCorners(byRadius(20));    // Round the corners.
  

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
    setDoc(batch, { isEnabled: true, approveMessage: "Your account has been approved" }, { merge: true })
      .then(() => {
        alert('Artist has been approved');
      })
      .catch((error) => {
        alert('unable to update the artist, check your internet connection');
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