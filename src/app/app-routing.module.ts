import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ContinueGameComponent } from './components/continue-game/continue-game.component';
import { CreditsComponent } from './components/credits/credits.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { GameComponent } from './components/game/game.component';
import { HomeComponent } from './components/home/home.component';
import { HowToPlayComponent } from './components/how-to-play/how-to-play.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { LoginComponent } from './components/login/login.component';
import { MenuGameComponent } from './components/menu-game/menu-game.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { OptionsComponent } from './components/options/options.component';
import { RegisterComponent } from './components/register/register.component';
import { AllUsersResolverService } from './resolvers/allUsers.resolver.service';
import { AllUserStatsResolverService } from './resolvers/allUserStats.resolver.service';
import { DataResolverService } from './resolvers/data.resolver.service';
import { LeaderboardResolverService } from './resolvers/leaderboard.resolver.service';
import { UserResolverService } from './resolvers/user.resolver.service';
import { UserStatResolverService } from './resolvers/userStat.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',

    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'my-account/:id',
    component: MyAccountComponent,
    resolve: {
      users: UserResolverService,
      userStats: UserStatResolverService,
    },
  },
  {
    path: 'how-to-play',
    component: HowToPlayComponent,
  },
  {
    path: 'options',
    component: OptionsComponent,
  },
  {
    path: 'edit-my-account/:id',
    component: EditUserComponent,
    resolve: {
      users: UserResolverService,
    },
  },
  {
    path: 'menu-game/:id',
    component: MenuGameComponent,
    canActivate: [AuthGuard],
    resolve: {
      users: UserResolverService,
      userStats: UserStatResolverService,
    },
  },
  {
    path: 'credits',
    component: CreditsComponent,
  },
  {
    path: 'continue-game/:id',
    component: ContinueGameComponent,
    resolve: {
      pokemons: DataResolverService,
      users: UserResolverService,
      userStat: UserStatResolverService,
    },
  },
  {
    path: 'game/:id',
    component: GameComponent,
    resolve: {
      pokemons: DataResolverService,
      users: UserResolverService,
      userStat: UserStatResolverService,
    },
  },
  {
    path: 'leaderboard/:id',
    component: LeaderboardComponent,
    resolve: {
      user: UserResolverService,
      users: AllUsersResolverService,
      userStats: LeaderboardResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
