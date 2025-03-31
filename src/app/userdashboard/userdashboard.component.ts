import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { MatDialog } from '@angular/material/dialog';
import { User, Users } from '../core/Modal/UserDashboard';
import { UserManagementService } from '../core/Service/user-management.service';
import { distinctUntilChanged, map } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss'],
  
})
export class UserdashboardComponent implements OnInit , AfterViewInit  {

  public displayedColumns: string[] = ['Name', 'Email', 'Role'];
  public chart: any;
  public chartLabels : string [] =['Admin', 'Editor', 'Viewer']
  public chartValues : number []=[0,0,0];

  public dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null= null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private dialog:MatDialog, public usermanagementservice:UserManagementService) {
   }

  ngOnInit(): void {
    const userItemCount$=this.usermanagementservice.state$.pipe(
      map(s=>s),
        distinctUntilChanged()
      )
    
    userItemCount$.subscribe((user)=>{
      this.dataSource=new MatTableDataSource<User>(user);
      this.chartValues=[0,0,0];
      for(let i=0;i<this.dataSource.data.length;i++){
        this.chartValues[this.chartLabels.indexOf(this.dataSource.data[i].role)]++;
      }
      this.dataSource.paginator = this.paginator;
      this.createChart();
  });

  }

  async openModal() {
    const { UserFormComponent } = await import(
      /* webpackPrefetch: true */ 
      '../user-form/user-form/user-form.component'
    );
  
    this.dialog.open(UserFormComponent);
  }
  createChart() {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels:this.chartLabels,
        datasets: [{
          label: 'My First Dataset',
          data:  this.chartValues,
          backgroundColor: [
            'red',
            'pink',
            'green',
            'yellow',
            'orange',
            'blue',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

}
