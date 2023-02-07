import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent implements OnInit {

  documentForm = this.fb.group({
    seller: this.fb.group({
      name: [''],
      street: [''],
      city: [''],
      postCode: ['', [Validators.pattern('^[0-9]{2}-[0-9]{3}$')]],
      idCardNumber: [''],
      idCardReleasedBy: [''],
      pesel: ['', [Validators.pattern('^\d{11}$')]],
      nip: ['', [Validators.pattern('^\d{11}$')]],
    }),
    vehicleInformation: this.fb.group({
      marka: [''], //to change
      prodYear: [''],
      engineNumber: [''],
      bodyNumber: [''],
      nrRejestracyjny: [''],
      mileage: [''],
      additionalInformation: ['']
    })

  });

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService) { }

  ngOnInit(): void {

    this.documentForm.valueChanges.subscribe(res => {
      this.documentService.setFormData(res)
    })
  }

  // onPrintPreview(): void {
  //   this.documentService.generateDocument();
  // }
}
