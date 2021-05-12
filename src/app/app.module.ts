import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Firebase services
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// Environment
import { environment } from '../environments/environment';
// Auth Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddResellerSheetComponent } from './components/dashboard/add-reseller-sheet/add-reseller-sheet.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
// Services
import { AuthService } from './shared/services/auth.service';
import { FirebaseCRUDService } from './shared/services/firebase-crud.service';
// Angular Material
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrdersComponent } from './components/orders/orders.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddResellerSheetComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    OrdersComponent,
    LoggedInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  providers: [
    AuthService,
    FirebaseCRUDService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
