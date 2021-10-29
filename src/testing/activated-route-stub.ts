import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

export class ActivatedRouteStub {
  public readonly paramMap: Observable<ParamMap>;
  public readonly snapshot = {};
  private readonly _subject = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.paramMap = this._subject.asObservable();

    this.setParamMap(initialParams);
  }

  public setParamMap(params: Params = {}): void {
    this._subject.next(convertToParamMap(params));
  }
}
