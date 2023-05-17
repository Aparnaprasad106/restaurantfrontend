import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
    @ViewChild('componentView', { static: false }) componentView!: ElementRef;

reservationArray:any =[]
  phone:string=''
  
  constructor(private api:ApiService,private route:ActivatedRoute){ }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.phone = params['phone'];
      this.reservationDetails(this.phone);
    });
  }
  reservationDetails(phone:any){
    this.api.reservationDetails(phone)
    .subscribe((result:any)=>{
      // 200
      console.log(result);
      this.reservationArray=result
      
    },
    (result:any)=>{
      console.log(result.error);
      
    })

  }

  // exportPdf
  exportPdf() {
    const doc = new jsPDF();
  
    // Set the desired width and height of the PDF
    const pdfWidth = 210; // in millimeters
    const pdfHeight = 397; // in millimeters
  
    const componentView = this.componentView.nativeElement;
  
    html2canvas(componentView).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
  
      // Calculate the aspect ratio of the component view
      const aspectRatio = canvas.width / canvas.height;
  
      // Calculate the adjusted dimensions based on the aspect ratio and desired width
      const adjustedWidth = pdfWidth;
      const adjustedHeight = adjustedWidth / aspectRatio;
  
      // If the adjusted height exceeds the desired height, scale down the dimensions
      if (adjustedHeight > pdfHeight) {
        const scaleDownFactor = pdfHeight / adjustedHeight;
        const scaledWidth = adjustedWidth * scaleDownFactor;
        const scaledHeight = adjustedHeight * scaleDownFactor;
        doc.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
      } else {
        doc.addImage(imgData, 'PNG', 0, 0, adjustedWidth, adjustedHeight);
      }
  
      doc.save('reservation.pdf');
    });
  }
  
  
}
