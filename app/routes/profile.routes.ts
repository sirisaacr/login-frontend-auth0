import { Routes }           from '@angular/router';
import { ProfileShow }      from '../components/profile_show/profile_show.component';
import { ProfileComponent } from '../components/profile/profile.component';

export const ProfileRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {path: '', component: ProfileShow}
    ]
  }
];
