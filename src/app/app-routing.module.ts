import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InGameComponent } from './in-game/in-game.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'Ingame', component: InGameComponent },
  { path: 'Draw', component: WelcomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

  
 }
