import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.scss']
})
export class DocumentPreviewComponent implements OnInit {

  sellerData: any;
  vehicleInformation: any;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    // this.documentService.generateDocument();

    this.documentService.getFormValues().subscribe(({seller, vehicleInformation}) => {
      console.log(seller);
      this.sellerData = seller;
      this.vehicleInformation = vehicleInformation;
    })
  }


}
