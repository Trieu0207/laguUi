import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CommonService } from './Services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private isValidToken(): boolean {
    const token = localStorage.getItem('isLogin');
    return !!token; // Trả về true nếu token tồn tại
  }
  constructor(private router: Router, private common: CommonService,private route: ActivatedRoute) {}
  public is_login: string = '';
  public menuItems: any[] = []


  ngOnInit(): void {
    // console.log(this.is_login)
    this.is_login = String(localStorage.getItem('isLogin'));
    if(this.is_login !== 'true'){
      this.menuItems = this.common.menuItems = [
        { label: 'Liên hệ', link: '/info' },
        { label: 'Login', link: '/login' }
      ]
    }
    else{
      this.menuItems = this.common.menuItems = this.common.menuItems.filter(
        (item) => item.label !== 'Đăng nhập'
      )
    }
    this.route.queryParams.subscribe(params => {
      if (params['refresh']) {
        this.filterMenu(this.is_login);
        this.is_login = String(localStorage.getItem('isLogin'));
        console.log(this.is_login);


        console.log('Trang đã được làm mới!' + this.is_login);
      }
    });
  }
  isClicked = false;
  title = 'test';
  name = 'phungtantrieu@gmail.com'

  handleItemClick(link: string) {
    this.router.navigateByUrl(link);
  }

  style: any = {};
  public logout(){
    this.is_login = 'false';
    this.common.menuItems = [
      { label: 'Liên hệ', link: '/info' },
      { label: 'Login', link: '/login' }
    ]
    this.filterMenu(this.is_login)
    localStorage.setItem('isLogin', 'false')
    const navigationExtras: NavigationExtras = {
      queryParams: { 'refresh': new Date().getTime() },
    };
    this.router.navigate(['/login'], navigationExtras)
    this.menuItems = this.common.menuItems
    console.log(this.menuItems);
    console.log(this.common.menuItems);

  }
  private filterMenu(is_login: any){
    if(is_login !== 'true'){
      this.menuItems = this.common.menuItems
      this.common.menuItems = [
        { label: 'Liên hệ', link: '/info' },
        { label: 'Đăng nhập', link: '/login' }
      ]
    }
    else{
      this.common.menuItems = this.menuItems;
      this.common.menuItems = this.common.menuItems.filter(
        (item) => item.label !== 'Đăng nhập'
      )
    }
  }

}
