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
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    NgxPayPalModule,
  ],

  exports: [],
  //services
  providers: [AuthenticationService, AppComponent],
  //bootStrap/Styling as whole
  bootstrap: [AppComponent],
})
export class AppModule {}
