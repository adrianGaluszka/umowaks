import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { formMode } from 'src/app/enums/form-modes.enum';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-form-menu',
  templateUrl: './form-menu.component.html',
  styleUrls: ['./form-menu.component.scss']
})
export class FormMenuComponent implements OnInit {

  formModeEnum = formMode;

  constructor(private readonly tooblarService: ToolbarService) { }

  get mode$(): Observable<formMode> {
    return this.tooblarService.getModeValue$();
  }

  ngOnInit(): void {
    this.tooblarService.getModeValue$().subscribe
  }

  onClickEdit(): void {
   this.tooblarService.onEdit();
  }

  onClickPreview(): void {
    this.tooblarService.onPreview();
  }
}
