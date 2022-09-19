import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postCampaign(data: any) {
    return this.http.post<any>('http://localhost:3004/posts', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getCampaign(): Observable<any> {
    return this.http.get<any>('http://localhost:3004/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  updateCampaign(data: any, id: number) {
    return this.http.put<any>('http://localhost:3004/posts/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteCampaign(id: number) {
    return this.http.delete<any>('http://localhost:3004/posts/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteCampaigns() {
    return this.http.delete<any>('http://localhost:3004/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
