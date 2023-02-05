import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
  }

  onPrint() {
    this.documentService.generateDocument();
  }

  onFillIn() {
    const offsetPosition = document.getElementById('document')!?.offsetTop - 62;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })

    // document.getElementById('document')?.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    //   inline: "nearest",

    // })
  }

}
