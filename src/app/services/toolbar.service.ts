import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { formMode } from '../enums/form-modes.enum';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private _modeValue: BehaviorSubject<formMode> = new BehaviorSubject<formMode>(formMode.edit);

  constructor() { }

  onEdit(): void {
    this._modeValue.next(formMode.edit);
  }

  onPreview(): void {
    this._modeValue.next(formMode.preview);
  }

  getModeValue$(): Observable<formMode> {
    return this._modeValue.asObservable();
  }
}
