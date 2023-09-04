import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getRequestOption } from 'src/app/utils/helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  baseUrl = `${environment.apiBaseUrl}match`;
  constructor(private http: HttpClient) { }
  getList(query: any) {
    let params = new HttpParams();
    for (const key in query) {
      if(query[key])
      params = params.append(key, query[key]);
    }
    return this.http.get<any>(this.baseUrl, { ...getRequestOption(), params });
  }
  updateProp(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, data, getRequestOption());
  }
  voteMatch(id: any, data: any) {
    return this.http.post(`${this.baseUrl}/vote/${id}`, data, getRequestOption());
  }
}
