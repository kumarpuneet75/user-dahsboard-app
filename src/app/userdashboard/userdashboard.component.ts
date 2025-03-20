import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { MatDialog } from '@angular/material/dialog';
import { User, Users } from '../core/Modal/UserDashboard';
import { UserManagementService } from '../core/Service/user-management.service';
import { distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss'],
  
})
export class UserdashboardComponent implements OnInit {

  public displayedColumns: string[] = ['Name', 'Email', 'Role'];
  public dataSource:any;
  public chart: any;
  public chartLabels : string [] =['Admin', 'Editor', 'Viewer']
  public chartValues : number []=[0,0,0];

  constructor(private dialog:MatDialog, public usermanagementservice:UserManagementService) { }

  ngOnInit(): void {
    const userItemCount$=this.usermanagementservice.state$.pipe(
      map(s=>s),
        distinctUntilChanged()
      )
    
    userItemCount$.subscribe((count)=>{
      console.log("count is: "+count)
      this.dataSource=count;
      this.chartValues=[0,0,0];
      for(let i=0;i<this.dataSource.length;i++){
        this.chartValues[this.chartLabels.indexOf(this.dataSource[i].role)]++;
      }
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
