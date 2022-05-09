import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from 'src/components/artist/artist.component';
import { ExhibitionComponent } from 'src/components/exhibition/exhibition.component';
import { MarketApprovalComponent } from 'src/components/market-approval/market-approval.component';
import { PaymentFailureComponent } from 'src/components/payment-failure/payment-failure.component';
import { PaymentGatewayComponent } from 'src/components/payment-gateway/payment-gateway.component';
import { PaymentSuccessComponent } from 'src/components/payment-success/payment-success.component';
import { SignInScreenComponent } from 'src/components/sign-in-screen/sign-in-screen.component';
import { SignUpScreenComponent } from 'src/components/sign-up-screen/sign-up-screen.component';
import { UserComponent } from 'src/components/user/user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'SignIn', pathMatch: 'full' },
  { path: 'SignIn', component: SignInScreenComponent },
  { path: 'SignUp', component: SignUpScreenComponent },
  { path: 'Market', component: MarketApprovalComponent },
  { path: 'Exhibition', component: ExhibitionComponent },
  { path: 'User', component: UserComponent },
  { path: 'Artist', component: ArtistComponent },
  { path: 'Payment', component: PaymentGatewayComponent },
  { path: 'Failure', component: PaymentFailureComponent },
  { path: 'Success', component: PaymentSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
