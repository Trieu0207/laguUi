import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public mon: any = {};
  public client_info = {
    client_id: 'ib69iWKH1eOizqM4uKMLxn2y1ZSVuWhPGcYL5IYI',
    client_secret: 'nixUTRvfxxzTZh7gZpCpxx5b33psHCpuQpvBWWlHJciCGpt3XzGFurSbSQYXIcR6k3AYiCE37GkSDAH09Z0crvDUpGqO3EMmAbR7pzY5CYnPH2uqzcHo68XrZY1OP9N8',
    grant_type: 'password'
  }
  public menuItems = [
    { label: 'Đăng nhập', link: '/login' },
    { label: 'Thanh toán', link: '/home' },
    { label: 'Danh mục Menu', link: '/menu' },
    { label: 'Đặt bàn', link: '/dat-ban' },
    { label: 'Nhận bàn', link: '/nhan-ban' },
    { label: 'Voucher', link: '/voucher' },
    { label: 'Quản lý khách hàng', link: '/khach-hang' },
    { label: 'Quản lý bàn ăn', link: '/ban' },
    { label: 'Manage', link: '/manage' },
    { label: 'Lịch sử hoạt động', link: '/active' },
    { label: 'thống kê-Báo Cáo', link: '/thong-ke' },
    { label: 'Liên hệ', link: '/info' },
  ]
   constructor() {}
}
