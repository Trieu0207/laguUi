import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  constructor(private common: CommonService, private route: ActivatedRoute){};
  menuItems: any[] = []
  public is_login = localStorage.getItem('isLogin')



  ngOnInit(): void {
    if(this.is_login !== 'true'){
      this.menuItems = this.common.menuItems
      this.common.menuItems = [
        { label: 'Liên hệ', link: '/info' },
        { label: 'Login', link: '/login' }
      ]
    }
    else{
      this.common.menuItems = this.menuItems;
      this.common.menuItems = this.common.menuItems.filter(
        (item) => item.label !== 'Login'
      )
    }
    this.route.queryParams.subscribe(params => {
      if (params['refresh']) {
        this.menuItems = this.common.menuItems;
        this.is_login = localStorage.getItem('isLogin');
        console.log(this.is_login);
        this.filterMenu(this.is_login);

        console.log('Trang đã được làm mới!' + this.is_login);
      }
    });
  }
  private filterMenu(is_login: any){
    if(is_login !== 'true'){
      this.menuItems = this.common.menuItems
      this.common.menuItems = [
        { label: 'Liên hệ', link: '/info' },
        { label: 'Login', link: '/login' }
      ]
    }
    else{
      this.common.menuItems = this.menuItems;
      this.common.menuItems = this.common.menuItems.filter(
        (item) => item.label !== 'Login'
      )
    }
  }

}
