import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { formMode } from './enums/form-modes.enum';
import { DocumentService } from './services/document.service';
import { ToolbarService } from './services/toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'umowaks';
  hideToolbar: boolean = true;

  @ViewChild('document') document!: ElementRef<HTMLElement>;
  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(event: Event): void {
    if (this.document?.nativeElement.offsetTop - 151 < window.scrollY) {
      console.log('visible');
      this.hideToolbar = false;
    } else {
      this.hideToolbar = true;
    }
  }

  @HostListener('window:scrollend', ['$event'])
  public onScrollEnd(event: Event): void {
    console.log(event);

  }

  get mode$(): Observable<formMode> {
    return this.toolbarService.getModeValue$();
  }

  constructor(
    private readonly toolbarService: ToolbarService,
    private readonly documentService: DocumentService,
    private readonly sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.toolbarService.getModeValue$().subscribe(mode => {
          console.log(mode);
          switch(mode) {
            case formMode.preview: {
              this.documentService.generateDocument();
            }
          }
        })
    }

    getDocumentUrl(): SafeHtml {
      const url = this.documentService.getDocumentUrl() + '#view=Fit&toolbar=0&navpanes=0&scrollbar=0'
      console.log(url);

      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    // getIframeHeight(el: HTMLIFrameElement) {
    //   console.log(el.contentWindow?.document.body.heig);

    //   return el.style.height = el.contentWindow?.document.body.offsetHeight + 'px';
    // }
}
