import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* ANGULAR MATERIAL */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

/** COMPONENTS */
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyStatsComponent } from './components/my-stats/my-stats.component';
import { HowToPlayComponent } from './components/how-to-play/how-to-play.component';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MyAccountComponent,
    MyStatsComponent,
    HowToPlayComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
