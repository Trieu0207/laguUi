import { Component, OnInit } from '@angular/core';
import { HttpServerService } from '../Services/http-server.service';
import { CommonService } from '../Services/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(
    private http: HttpClient,
    private httpServerServices: HttpServerService,
    private common: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ){};
  public username: string = '';
  public password: string = '';
  public email: string = '';
  public firstname: string = '';
  public lastname: string = '';
  public newusername: string = '';
  public newpassword: string = '';
  public Repwd: string = '';
  public checkpass:boolean = false;

  public dataRes: any[] =[];
  ngOnInit(): void {

  }
  public login() {
    if (!this.common.client_info) {

      console.error('Client information is missing.');
      return;
    }

    // Tạo đối tượng HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // Tạo dữ liệu để gửi
    const body = `username=${this.username}&password=${this.password}&client_id=${this.common.client_info.client_id}&client_secret=${this.common.client_info.client_secret}&grant_type=${this.common.client_info.grant_type}`;

    // Gửi yêu cầu POST
    this.http.post('http://127.0.0.1:8000/o/token/', body, { headers: headers })
      .subscribe(
        (data) => {
          console.log('Token Response:', data);
          // Xử lý token nhận được ở đây
        },
        (error) => {
          console.error('Error during token request:', error);
        }
      );
  }
  public cancel(){
    this.firstname = '';
    this.lastname = '';
    this.newusername = '';
    this.newpassword = '';
    this.email = '';
  }
  public register(){
    if(this.firstname !== '' && this.lastname !== '' &&
       this.newusername !== '' && this.newpassword !== '' && this.email !== ''){
        let payload = new FormData();
        payload.append('first_name', this.firstname)
        payload.append('last_name', this.lastname)
        payload.append('username', this.newusername)
        payload.append('password', this.newpassword)
        payload.append('email', this.email)
        this.httpServerServices.register(payload).subscribe((data) => {
          console.log(data);
          alert('Register successful');
          window.location.reload();
        },(error) => {
          // Xử lý khi xảy ra lỗi khi tải lên
            alert('Đăng nhập thất bại')
            console.error('Lỗi: ', error);
          })
       }
  }

  public simpleLogin(){
    let formData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);
    this.httpServerServices.simpleLogin(formData).subscribe(
      (data) => {
        this.common.menuItems = [
          { label: 'Thanh toán', link: '/home' },
          { label: 'Danh mục Menu', link: '/menu' },
          { label: 'Đặt bàn', link: '/dat-ban' },
          {label: 'Nhận bàn', link: '/nhan-ban' },
          { label: 'Voucher', link: '/voucher' },
          { label: 'Danh mục Bàn ăn', link: '/ban' },
          { label: 'Quản lý khách hàng', link: '/khach-hang' },
          { label: 'Manage', link: '/manage' },
          { label: 'Lịch sử hoạt động', link: '/active' },
          { label: 'Thống kê - Báo cáo', link: '/thong-ke' },
          { label: 'Liên hệ', link: '/info' }

        ];
        const navigationExtras: NavigationExtras = {
          queryParams: { 'refresh': new Date().getTime() },
        };
        localStorage.setItem('isLogin', data.isLogin)
        this.router.navigate(['/home'], navigationExtras)
      },  (error) => {
        // Xử lý khi xảy ra lỗi khi tải lên
          alert('Đăng nhập thất bại')
          console.error('Lỗi: ', error);
        })
  }
  public onchange(event: any): void {
    let rePass = String(event.target.value)
    if(rePass !== undefined && rePass !== this.newpassword) {
      this.checkpass = false;
    }
    else{
      this.checkpass = true
    }
  }

  public login2(){
    // Tạo dữ liệu để gửi
    const body = `username=${this.username}&password=${this.password}&client_id=${this.common.client_info.client_id}&client_secret=${this.common.client_info.client_secret}&grant_type=${this.common.client_info.grant_type}`;
    this.httpServerServices.login(body).subscribe(
      (data) => {
      localStorage.setItem('access_token', data.access_token);
      console.log(localStorage.getItem('access_token'));
      },  (error) => {
      // Xử lý khi xảy ra lỗi khi tải lên
        console.error('Lỗi: ', error);
      }
      )
  }

}
