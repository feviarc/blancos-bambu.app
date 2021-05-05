import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Components
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
// App Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
// Guards
import { AuthGuard } from './shared/guards/auth.guard';
import { EmailVerifiedGuard } from './shared/guards/email-verified.guard';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, EmailVerifiedGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard, EmailVerifiedGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [AuthGuard] },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
