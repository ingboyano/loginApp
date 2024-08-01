import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateChatPage } from './private-chat.page';

const routes: Routes = [
  {
    path: '',
    component: PrivateChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateChatPageRoutingModule {}
