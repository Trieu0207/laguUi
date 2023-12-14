import { Component, OnInit } from '@angular/core';
import { HttpServerService } from '../Services/http-server.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-thong-ke',
  templateUrl: './thong-ke.component.html',
  styleUrls: ['./thong-ke.component.css']
})
export class ThongKeComponent implements OnInit {
  constructor(
    private httpServerServices: HttpServerService,
    private datePipe: DatePipe
    ){};
    public time_chose_1 = '';
    public time_chose_2 = '';
    public time_chose_3 = '';
    public current_time = new Date();
    public thongKeDoanhThu: any[] = [];
    public thongKeDoanhTime: any[] = [];
    public menuServer: any[] = [];
    public menuFilterServer: any[] = [];
    public menuFilter: any[] = [];
    public thongKeMonToday: any[] = [];
    public thongKeMonTheoTime: any[] = [];
    public thongKeDatBanToday: any[] = [];
    public thongKeDatBanTime: any[] = [];
    public loaiMathang: any[] = [];


    public barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public barChartLabels:any = []
    public barChartLabels2:any = []
    public barChartLabels3:any = []
    public pieChartLabels:any = []
    public barChartType = 'bar';
    public barChartLegend = true;

    public barChartData:any = []
    public barChartData2:any = []
    public barChartData3:any = []
    public pieChartData:any = []

    public chartType: string = 'pie';
    public chartData: any[] = [
      {data:15000,label:'mon nuoc'},
      {data:45000,label:'mon an'},
      {data:56000,label:'trang mieng'}
    ]
    public chartLabels: string[] = ['Red', 'Green', 'Blue'];

    public timer_1 = {
      start_time:'',
      end_time:''
    }
    public timer_2 = {
      start_time:'',
      end_time:''
    }
    public timer_3 = {
      start_time:'',
      end_time:''
    }
    public doanhThuToday = {
      ngay:'',
      total_tong_tien: 0,
      total_so_luong: 0
    };
  ngOnInit(): void {
    this.httpServerServices.thongKeLoaiMonth().subscribe((resData) => {
      this.loaiMathang = resData
      let temp: number[] = [resData.mon_nuoc, resData.mon_an, resData.trang_mieng];
      let tong = resData.mon_nuoc + resData.mon_an + resData.trang_mieng
      let labels = ['Món nước', 'Món ăn', 'Tráng miệng'];
      this.pieChartLabels = this.barChartLabels3=labels
      this.pieChartData=[{data: temp}]
      this.barChartData3= [
        {data: temp, label:'Thống kê các mặt hàng'},
        {data: [tong,tong,tong], label:'Tổng'},
      ]
    })
    this.httpServerServices.thongKeDoanhThu().subscribe((data)=>{
      this.thongKeDoanhThu = data
      let num: number[] = this.thongKeDoanhThu.map(item => item.thang);
      let data1:number[] = this.thongKeDoanhThu.map(item => item.doanh_thu);
      let data2:number[] = this.thongKeDoanhThu.map(item => item.so_luong);
      this.barChartLabels = this.barChartLabels2 = num
      this.barChartData = [{data: data1, label:'Doanh Thu Trong Năm'}]
      this.barChartData2 = [{data: data2, label:'Số lượng Hóa Đơn'}]
    })
    this.httpServerServices.thongKeMonAnToday().subscribe((data)=>{
      this.thongKeMonToday = this.menuServer = data
    })

  }
  public formattedDate(time: any): any {
    return this.datePipe.transform(time, 'yyyy-MM-dd');
  }
  public exportToExcel(data: any[]): void {
    let prefix = "data";
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 10); // Lấy ngày tháng năm
    const filename = `${prefix}_${timestamp}`;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }
  public loadDoanhThuToday(): void {
    this.httpServerServices.thongKeDoanhThuToday().subscribe(data => {
      this.doanhThuToday = data
      this.thongKeDoanhTime = []
    },(error) =>{
      console.log(error);
    })
  }
  public loadDatBan(): void {
    if (this.thongKeDatBanToday != undefined){
      this.httpServerServices.thongKeDatBan().subscribe(data => {
        this.thongKeDatBanToday = data
      })
    }

  }
  public thongKeDatBanTheoNgay(time: any): void {
    if(time != ''){
      const formatTime = this.datePipe.transform(time, 'yyyy-MM-dd');
      if(formatTime !== null && formatTime !== undefined){
        let payload = {start_time: formatTime}
        this.httpServerServices.thongKeDatBanTheoTime(payload).subscribe((data) => {
          this.thongKeDatBanToday = data;
        })
      }
    }
  }
  public thongKeDatBanTheoTime(time: any): void {
    if(time.start_time !=='' && time.end_time !==''){
      const formattedDateTime_start = this.datePipe.transform(time.start_time, 'yyyy-MM-dd');
      const formattedDateTime_end = this.datePipe.transform(time.end_time, 'yyyy-MM-dd');
      if ((formattedDateTime_start !== null && formattedDateTime_start !== undefined) &&
        (formattedDateTime_end !== null && formattedDateTime_end !== undefined)){
          time = {
            start_time: formattedDateTime_start,
            end_time: formattedDateTime_end
          }
          this.httpServerServices.thongKeDatBanTheoTime(time).subscribe((data) => {
            this.thongKeDatBanTime = data
          })
        }

    }
  }

  public thongKeMonAnToday(): void{
    this.httpServerServices.thongKeMonAnToday().subscribe(data => {
      this.thongKeMonToday = data;
    });
  }

  public thongKeTheoThoiGian(time: any): void{
    if(time.start_time !=='' && time.end_time !==''){
      const formattedDateTime_start = this.datePipe.transform(time.start_time, 'yyyy-MM-dd');
      const formattedDateTime_end = this.datePipe.transform(time.end_time, 'yyyy-MM-dd');
      if ((formattedDateTime_start !== null && formattedDateTime_start !== undefined) &&
        (formattedDateTime_end !== null && formattedDateTime_end !== undefined))
      {
          time = {
            start_time: formattedDateTime_start,
            end_time: formattedDateTime_end
          }
          this.httpServerServices.thongKeDoanhThuTheoThoiGian(time).subscribe((data) =>{
            for(let item of data){
              var temp = {
                ngay: String(item.nam +'-'+item.thang+'-'+item.ngay),
                total_so_luong: item.total_so_luong,
                total_tong_tien: item.total_tong_tien
              }
              this.thongKeDoanhTime.push(temp)
            }

          })
      }
    }

  }
  public thongKeMonAnTheoThoiGian(time: any): void{
    if(time.start_time !=='' && time.end_time !==''){
      const formattedDateTime_start = this.datePipe.transform(time.start_time, 'yyyy-MM-dd');
      const formattedDateTime_end = this.datePipe.transform(time.end_time, 'yyyy-MM-dd');
      if ((formattedDateTime_start !== null && formattedDateTime_start !== undefined) &&
        (formattedDateTime_end !== null && formattedDateTime_end !== undefined))
       {
          time = {
            start_time: formattedDateTime_start,
            end_time: formattedDateTime_end
          };
          this.httpServerServices.thongKeMonAnTheoThoiGian(time).subscribe((data) =>{
            this.thongKeMonTheoTime = this.menuFilterServer = data;

          })
       }
    }
  }
  public thongKeDoanhThuTheoNgay(): void{
    const formattedDateTime = this.datePipe.transform(this.time_chose_1, 'yyyy-MM-dd');
    if(formattedDateTime !== null && formattedDateTime !== undefined){
      let payload = {time: formattedDateTime}
      this.httpServerServices.thongKeDoanhThuTheongay(payload).subscribe((data) =>{
        this.doanhThuToday = data;
      })
    }
  }
  public thongKeMonAnTheoNgay(): void{
    const formattedDateTime = this.datePipe.transform(this.time_chose_2, 'yyyy-MM-dd');
    if(formattedDateTime !== null && formattedDateTime !== undefined){
      let payload = {time: formattedDateTime}
      this.httpServerServices.thongKeMonTheongay(payload).subscribe((data) => {
        this.thongKeMonToday = this.menuServer = data
      })
    }
  }

  public clearTimer2(): void {
    this.timer_2.start_time = '';
    this.timer_2.end_time = '';
    this.thongKeMonTheoTime = []
  }
  public clearTimer1(): void {
    this.timer_1.start_time = '';
    this.timer_1.end_time = '';
    this.thongKeDoanhTime = [];
  }
  public clearTimer3(): void {
    this.timer_3.start_time = '';
    this.timer_3.end_time = '';
    this.thongKeDatBanTime = [];
  }
  public clearChose1(): void {
    this.time_chose_1 = '';
    this.httpServerServices.thongKeDoanhThuToday().subscribe(data => {
      this.doanhThuToday = data;
    })
  }
  public clearChose2(): void {
    this.time_chose_2 = '';
    this.httpServerServices.thongKeMonAnToday().subscribe((data) => {
      this.thongKeMonToday = this.menuServer = data;
    })
  }
  public clearChose3(): void {
    this.time_chose_3 = '';
    this.httpServerServices.thongKeDatBan().subscribe((data) => {
      this.thongKeDatBanToday = data;
    });
  }
  public mon_an(): void{
    let filter = []
    for(let item of this.menuServer){
      if(item.menu__loai.includes("mon_an")){
        filter.push(item);
      }
    }
    this.thongKeMonToday = filter
  }
  public thuc_uong(): void{
    let filter = []
    for(let item of this.menuServer){
      if(item.menu__loai.includes("mon_nuoc")){
        filter.push(item);
      }
    }
    this.thongKeMonToday = filter
  }
  public trang_mieng(): void{
    let filter = []
    for(let item of this.menuServer){
      if(item.menu__loai.includes("trang_mieng")){
        filter.push(item);
      }
    }
    this.thongKeMonToday = filter
  }
  public all(): void{
    this.thongKeMonToday = this.menuServer
  }

  public mon_an_2(): void{
    let filter = []
    for(let item of this.menuFilterServer){
      if(item.menu__loai.includes("mon_an")){
        filter.push(item);
      }
    }
    this.thongKeMonTheoTime = filter
  }
  public thuc_uong_2(): void{
    let filter = []
    for(let item of this.menuFilterServer){
      if(item.menu__loai.includes("mon_nuoc")){
        filter.push(item);
      }
    }
    this.thongKeMonTheoTime = filter
  }
  public trang_mieng_2(): void{
    let filter = []
    for(let item of this.menuFilterServer){
      if(item.menu__loai.includes("trang_mieng")){
        filter.push(item);
      }
    }
    this.thongKeMonTheoTime = filter
  }
  public all_2(): void{
    this.thongKeMonTheoTime = this.menuFilterServer
  }
  public thongKeDanhThuThang(): void{
    this.httpServerServices.thongKeDoanhThu().subscribe((data)=>{
      let resData: any[] = data
      let num: number[] = resData.map(item => item.thang);
      let data1:number[] = resData.map(item => item.doanh_thu);
      let data2:number[] = resData.map(item => item.so_luong);
      this.barChartLabels = this.barChartLabels2 = num
      this.barChartData = [{data: data1, label:'Doanh Thu Trong Năm'}]
      this.barChartData2 = [{data: data2, label:'Số lượng Hóa Đơn'}]
    })
  }

  public thongKeDanhThuQuy(): void{
    this.httpServerServices.thongKeDoanhThuQuy().subscribe((data)=>{
      let resData: any[] = data
      let num: number[] = resData.map(item => item.quy);
      let data1:number[] = resData.map(item => item.total_tong_tien);
      let data2:number[] = resData.map(item => item.total_so_luong);
      this.barChartLabels = this.barChartLabels2 = num
      this.barChartData = [{data: data1, label:'Doanh Thu Trong Năm'}]
      this.barChartData2 = [{data: data2, label:'Số lượng Hóa Đơn'}]
    })
  }









}
