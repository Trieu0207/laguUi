import { Component, OnInit } from '@angular/core';
import { HttpServerService } from '../Services/http-server.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  constructor(
    private httpServerServices: HttpServerService,
  ){}
  public dsRole:any[] = [];
  public roleValue: number = 0;
  public roleId:number = 0;
  ngOnInit(): void {
    this.httpServerServices.getAllRole().subscribe(role => {
      this.dsRole = role;
    },(error) =>{
      alert(error.error)
      console.log(error);
    })
  }

  public submit(){
    let payload = {value:this.roleValue}
    this.httpServerServices.updateRole(this.roleId, payload).subscribe(
      data =>{
        alert(data.message);
        window.location.reload();
      }, (error) =>{
        alert(error.error)
        console.log(error);
      }
    )
  }

}
