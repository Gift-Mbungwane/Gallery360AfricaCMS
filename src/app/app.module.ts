//Module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material design
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { NgxPayPalModule } from 'ngx-paypal';

//Firebase
import { initializeApp } from 'firebase/app';
//screens
import { AppComponent } from './app.component';
import { SignInScreenComponent } from 'src/components/sign-in-screen/sign-in-screen.component';
import { SignUpScreenComponent } from 'src/components/sign-up-screen/sign-up-screen.component';
import { MarketApprovalComponent } from 'src/components/market-approval/market-approval.component';

//routes and Services
import { routes } from './app-routing.module';
import { AuthenticationService } from 'src/components/services/authentication.service';
import { ArtistComponent } from 'src/components/artist/artist.component';
import { UserComponent } from 'src/components/user/user.component';
import { ExhibitionComponent } from 'src/components/exhibition/exhibition.component';
import { PaymentGatewayComponent } from 'src/components/payment-gateway/payment-gateway.component';
import { PaymentFailureComponent } from 'src/components/payment-failure/payment-failure.component';
import { PaymentSuccessComponent } from 'src/components/payment-success/payment-success.component';
import { OnErrorComponent } from '../components/on-error/on-error.component';
//
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
//
import { CdkAccordionModule } from '@angular/cdk/accordion';
//modals
import { onDisableModal } from 'src/components/modalComponents/onDisableModal';
import { onDisableArtistModal } from 'src/components/artist/modalComponents/onDisableArtistModal';
import { onDisableUserModal } from 'src/components/user/modalComponents/onDisableUserModal';
import { onDisableExhibitionModal } from 'src/components/exhibition/modalComponents/onDisableExhibitionModal';
//guards
import { ArtistGuard } from 'src/components/guards/artist.guard';
import { UserGuard } from 'src/components/guards/user.guard';
import { MarketGuard } from 'src/components/guards/market.guard';
import { ExhibitionGuard } from 'src/components/guards/exhibition.guard';
import { PaymentDetailsComponent } from 'src/components/payment-details/payment-details.component';
import { PaymentDetailsGuard } from 'src/components/guards/payment-details.guard';
import { ModalComponent } from 'src/components/payment-details/modalComponent';
import { OrdersComponent } from 'src/components/orders/orders.component';
import { searchDateFilterPipe, SearchFilterPipe } from 'src/components/searchfilter/search-filter.pipe';
import { HttpClientModule } from '@angular/common/http';

//configure firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBCqBD_w3D_yiV2w63rlLoH8ZSqRPS-wCM',
  authDomain: 'gallery-360-africa.firebaseapp.com',
  projectId: 'gallery-360-africa',
  storageBucket: 'gallery-360-africa.appspot.com',
  messagingSenderId: '977191750253',
  appId: '1:977191750253:web:e904658e10a43b0e5fcd64',
  measurementId: 'G-XDXYJT7HBJ',
};

initializeApp(firebaseConfig);

@NgModule({
  //componentScreen
  declarations: [
    AppComponent,
    SignUpScreenComponent,
    SignInScreenComponent,
    MarketApprovalComponent,
    ArtistComponent,
    UserComponent,
    ExhibitionComponent,
    PaymentGatewayComponent,
    PaymentFailureComponent,
    PaymentSuccessComponent,
    PaymentDetailsComponent,
    OnErrorComponent,
    onDisableModal,
    onDisableArtistModal,
    onDisableUserModal,
    onDisableExhibitionModal,
    ModalComponent,
    OrdersComponent,
    SearchFilterPipe,
    searchDateFilterPipe,
  ],
  //Modules
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), //expose to endpoint
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    NgxPayPalModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    CdkAccordionModule,
    HttpClientModule,
    
    // AlertModule,
  ],

  exports: [],
  //services
  providers: [
    AuthenticationService,
    // AlertService,
    AppComponent,
    ArtistGuard,
    UserGuard,
    MarketGuard,
    ExhibitionGuard,
    PaymentDetailsGuard,
  ],
  //bootStrap/Styling as whole
  bootstrap: [AppComponent],
})
export class AppModule {}
