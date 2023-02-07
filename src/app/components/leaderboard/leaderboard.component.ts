import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserStat } from 'src/app/models/userStat';
import { AuthService } from 'src/app/services/auth.service';
import { UserStatService } from 'src/app/services/user-stat.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  public allUsers: User[];
  public allUsersStats: UserStat[];
  public users: any;
  public userID: string;
  public spinner = false;

  constructor(
    private _authService: AuthService,
    private _userStatService: UserStatService,
    private router: ActivatedRoute
  ) {
    this.userID = this.router.snapshot.data['user'].user._id;
    this.allUsers = this.router.snapshot.data['users'].users;
    this.allUsersStats = this.router.snapshot.data['userStats'].userStats;
  }

  ngOnInit(): void {
    const data = this.allUsersStats?.map((stats) => {
      const user = this.allUsers?.find((user) => user?._id === stats?.user);
      console.warn({
        username: user?.username,
        victories: stats?.victories,
        score: Math.round(stats?.score),
      });
      return {
        username: user?.username,
        victories: stats?.victories,
        score: Math.round(stats?.score),
      };
    });

    this.users = data?.sort((a, b) => b.score - a.score);
  }
}
