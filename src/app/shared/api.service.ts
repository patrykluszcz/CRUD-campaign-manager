import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { campaignModel } from '../models/campaignModel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:3004/posts';

  constructor(private http: HttpClient) {}

  postCampaign(data: any) {
    return this.http.post<any>(this.apiUrl, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getCampaign(): Observable<campaignModel[]> {
    return this.http.get<campaignModel[]>(this.apiUrl);
  }

  updateCampaign(data: any, id: number) {
    return this.http.put<any>(this.apiUrl + '/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteCampaign(id: number) {
    return this.http.delete<any>(this.apiUrl + '/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // deleteCampaigns() {
  //   return this.http.delete<any>(this.apiUrl).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }
}
