import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';
import { NhanBanComponent } from './nhan-ban/nhan-ban.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { DatBanComponent } from './dat-ban/dat-ban.component';
import { DatBanDetailComponent } from './dat-ban-detail/dat-ban-detail.component';
import { VoucherComponent } from './voucher/voucher.component';
import { BanComponent } from './ban/ban.component';
import { ThongKeComponent } from './thong-ke/thong-ke.component';
import { KhachHangComponent } from './khach-hang/khach-hang.component';
import { NgChartsModule } from 'ng2-charts';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { ActiveComponent } from './active/active.component';
import { ManageComponent } from './manage/manage.component';
const routes: Routes = [
  // { path: '', component: PageNotFoundComponent},
  { path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'', component: InfoComponent},
  {path:'menu', component: MenuComponent},
  {path:'ban', component: BanComponent},
  {path:'nhan-ban', component: NhanBanComponent},
  {path:'dat-ban', component: DatBanComponent},
  {path:'voucher', component: VoucherComponent},
  {path:'thong-ke', component: ThongKeComponent},
  {path:'khach-hang', component: KhachHangComponent},
  {path:'info', component: InfoComponent},
  {path:'active', component: ActiveComponent},
  {path:'manage', component: ManageComponent},
  {path:'create-menu', component: CreateMenuComponent},
  {path:'menu-detail/:id', component: MenuDetailComponent},
  {path:'dat-ban-detail/:id', component: DatBanDetailComponent},
  {path:'**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),NgChartsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
