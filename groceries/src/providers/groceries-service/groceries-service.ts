import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, throwError, map, catchError, tap } from 'rxjs';


/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {

  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangedSubject: Subject<boolean>;

  baseURL = "https://groceries-server-heroku2-909b8c94a50b.herokuapp.com"

  constructor(public http: HttpClient) {
    console.log('Hello GroceriesServiceProvider Provider');

    this.dataChangedSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangedSubject.asObservable();
  }

  getItems(): Observable<object[]> {
    return this.http.get<object[]>(this.baseURL + '/api/groceries').pipe(
      tap((_) => this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || [];
  }

  private handleError(error: Response | any) {

    let e = JSON.stringify(error, null, 2);
    console.log("Errors: ", e);

    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(errMsg);
  }

  deleteItem(id) {
    console.log("Remove Item - id = ", id);
    this.http.delete(this.baseURL + "/api/groceries/" + id).subscribe(res => {
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }

  addItem(item) {
    this.http.post(this.baseURL + '/api/groceries/', item).subscribe((res)=> {
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }

  editItem(item, index) {
    console.log("Edit Item = ", item);
    this.http.put(this.baseURL + '/api/groceries/' + item._id, item).subscribe((res) => {
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }

}
