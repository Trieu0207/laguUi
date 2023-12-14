import { Component, OnInit } from '@angular/core';
import { HttpServerService } from '../Services/http-server.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {

  constructor(
    private httpServerServices: HttpServerService,
    private datePipe: DatePipe
  ){}
  public date: string = ''
  public history_active: any[] = [];
  ngOnInit(): void {
    this.httpServerServices.getHistoryActive().subscribe(data => {
      this.history_active = data
    })
  }
  public today(): string{
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    return (`${day}/${month}/${year}`);

  }

  public format_time(time: string): string {
    let dotIndex = time.indexOf('.');
    let tindex = time.indexOf('T') + 1;
    let reFormatTime = time.slice(tindex, dotIndex)
    return reFormatTime
  }
  public search(){
    const formattedDateTime = this.datePipe.transform(this.date, 'yyyy-MM-dd');
      if (formattedDateTime !== null && formattedDateTime !== undefined){
        let payload = {date: formattedDateTime.toString()};
        this.httpServerServices.getHistoryActiveByDay(payload).subscribe(data => {
          this.history_active = data;
        },(error) =>{
          alert(error.error)
          console.log(error);
        })
      }
  }

}
