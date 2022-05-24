import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { LayoutModule } from '@angular/cdk/layout'
import { HttpClientModule } from '@angular/common/http'

import { HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DialogContentComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* ANGULAR MATERIAL */
import { MatCommonModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatRadioModule } from '@angular/material/radio'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSortModule } from '@angular/material/sort'
import { MatRippleModule } from '@angular/material/core'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatStepperModule } from '@angular/material/stepper'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatSliderModule } from '@angular/material/slider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatGridListModule } from '@angular/material/grid-list'
import {MatNativeDateModule} from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree'
import {DragDropModule} from '@angular/cdk/drag-drop';

/** COMPONENTS */
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { HowToPlayComponent } from './components/how-to-play/how-to-play.component';
import { DatePipe } from '@angular/common';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MenuGameComponent } from './components/menu-game/menu-game.component';
import { CreditsComponent } from './components/credits/credits.component';
import { ContinueGameComponent } from './components/continue-game/continue-game.component';
import { GameComponent } from './components/game/game.component';
import { OptionsComponent } from './components/options/options.component';


/* RESOLVERS */

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MyAccountComponent,
    HowToPlayComponent,
    EditUserComponent,
    MenuGameComponent,
    CreditsComponent,
    ContinueGameComponent,
    GameComponent,
    OptionsComponent,
    DialogContentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    MatNativeDateModule,
    MatSliderModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatRadioModule,
    MatStepperModule,
    AppRoutingModule,
    MatSortModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressBarModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    LayoutModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSliderModule,
    MatTooltipModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatStepperModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSortModule,
    MatRippleModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatGridListModule,
    MatTreeModule,
    DragDropModule,
  ],
  providers: [
    HttpClient,
    HttpClientModule,
    DatePipe,  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
