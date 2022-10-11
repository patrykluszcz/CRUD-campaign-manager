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

  getCampaigns(): Observable<campaignModel[]> {
    return this.http.get<campaignModel[]>(this.apiUrl);
  }

  getCampaignById(id: number): Observable<campaignModel[]> {
    return this.http.get<campaignModel[]>(this.apiUrl + '/' + id);
  }

  postCampaign(data: object) {
    return this.http.post<object>(this.apiUrl, data).pipe(
      map((res: object) => {
        return res;
      })
    );
  }

  updateCampaigns(data: object, id: number) {
    return this.http.put<object>(this.apiUrl + '/' + id, data).pipe(
      map((res: object) => {
        return res;
      })
    );
  }

  deleteCampaign(id: number) {
    return this.http.delete<object>(this.apiUrl + '/' + id).pipe(
      map((res: object) => {
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
