import {NgModule} from "@angular/core";
import {RecentlyAddedComponent} from "./app/recently-added/recently-added.component";
import {GoComponent} from "./app/go/go.component";
import {SettingsComponent} from "./app/settings/settings.component";
import {Routes,RouterModule} from "@angular/router";
import {CanDeactivateGuard} from "./can-deactivate.guard";

export const appRoutes: Routes = [
  { path: 'recently-added', component: RecentlyAddedComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'go', component: GoComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '/recently-added', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
