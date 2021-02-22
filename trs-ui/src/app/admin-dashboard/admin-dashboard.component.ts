import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {DashboardService} from "./service/dashboard.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private data = [
    {"Type": "", "Count": ""},
  ];
  noRecordsFound:boolean |undefined;
  selectedDate:Date = new Date();
  private svg:any;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors:any;

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.Count.toString()))
      .range(["#c7d3ec", "#94C973"]);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.Count));

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => (this.colors(i)))

    // Add labels
    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d: { data: { Type: any, Count: any; }; }) => d.data.Type + " (" + d.data.Count + ")")
      .attr("transform", (d: d3.DefaultArcObject) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 18);
  }

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.renderDataByDate(this.selectedDate);
    this.createChart();
  }

  onDateChange(event: any){
    this.renderDataByDate(event.target.value);
    this.createChart();
  }

  renderDataByDate(date: Date){
    this.dashboardService.getReportData(date.toString()).subscribe(data=> {
      this.data = [];
      // @ts-ignore
      document.getElementById("pie").innerHTML="";
      if(data["reservationCount"] == 0 && data["paymentCount"] == 0){
        this.noRecordsFound = true;
      }else {
        this.noRecordsFound = false;
        this.data.push({"Type": "Reservation", "Count": data["reservationCount"]})
        this.data.push({"Type": "Payment", "Count": data["paymentCount"]})
        this.createChart();
      }
    })
  }

  createChart(){
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

}
