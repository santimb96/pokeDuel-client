import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CreditsComponent } from './components/credits/credits.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { RoundOneComponent } from './components/game/round-one/round-one.component';
import { HomeComponent } from './components/home/home.component';
import { HowToPlayComponent } from './components/how-to-play/how-to-play.component';
import { LoginComponent } from './components/login/login.component';
import { MenuGameComponent } from './components/menu-game/menu-game.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyStatsComponent } from './components/my-stats/my-stats.component';
import { RegisterComponent } from './components/register/register.component';
import { DataResolverService } from './resolvers/data.resolver.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'my-stats', component: MyStatsComponent },
  { path: 'how-to-play', component: HowToPlayComponent },
  { path: 'edit-my-account', component: EditUserComponent },
  { path: 'menu-game', component: MenuGameComponent },
  { path: 'credits', component: CreditsComponent },
  { 
    path: 'game/round-one', 
    component: RoundOneComponent,
    resolve: {
      pokemons: DataResolverService
    }
   },
];
// falta gameComponent --> how many routes must be?


@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
    ReactiveFormsModule,
  ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
