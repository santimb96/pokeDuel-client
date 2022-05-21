import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ContinueGameComponent } from './components/continue-game/continue-game.component';
import { CreditsComponent } from './components/credits/credits.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { RoundOneComponent } from './components/game/round-one/round-one.component';
import { HomeComponent } from './components/home/home.component';
import { HowToPlayComponent } from './components/how-to-play/how-to-play.component';
import { LoginComponent } from './components/login/login.component';
import { MenuGameComponent } from './components/menu-game/menu-game.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyStatsComponent } from './components/my-stats/my-stats.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { RegisterComponent } from './components/register/register.component';
import { DataResolverService } from './resolvers/data.resolver.service';
import { UserResolverService } from './resolvers/user.resolver.service';
import { UserStatResolverService } from './resolvers/userStat.resolver.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-account/:id', component: MyAccountComponent },
  {
    path: 'my-stats/:id/:id2',
    component: MyStatsComponent,
    resolve: {
      users: UserResolverService,
      userStats: UserStatResolverService
    }
  },
  { path: 'how-to-play', component: HowToPlayComponent },
  { path: 'edit-my-account', component: EditUserComponent },
  { 
    path: 'menu-game/:id', 
    component: MenuGameComponent,
    resolve: {
      users: UserResolverService,
      userStats: UserStatResolverService
    }
  },
  { path: 'credits', component: CreditsComponent },
  {
    path: 'continue-game/:id/:id2',
    component: ContinueGameComponent,
    resolve: {
      pokemons: DataResolverService,
      users: UserResolverService,
      userStats: UserStatResolverService
    }
  },
  {
    path: 'new-game/:id',
    component: NewGameComponent,
    resolve: {
      pokemons: DataResolverService,
      users: UserResolverService
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
