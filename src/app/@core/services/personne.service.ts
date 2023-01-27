import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  private apiEndPint = `${environment.BASE}/personne`;

  constructor(private http: HttpClient) {
  }

  sendMail(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/sendMail`);
  }
}
