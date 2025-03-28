import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ReadStore } from 'src/app/shared/model/stores/read-store.interface'
import { ApiResponseDTO } from '../model/common/api-response.interface'

@Injectable({
  providedIn: 'root'
})

export class NearbyStoresService {
  private apiUrl = 'http://localhost:3000/api/stores/' // Stores API

  constructor(private http: HttpClient) { }

  // 모든 가게 조회
  getAllStores(): Observable<ReadStore[]> {
    return this.http.get<ApiResponseDTO<ReadStore[]>>(`${this.apiUrl}`).pipe(
      map(response => {
        return response.data ?? [] // API 응답에서 data만 반환, data가 undefined이면 빈 배열 반환
      })
    )
  }

  // 특정 가게 조회
  getStoreById(store_id: number): Observable<ReadStore> {
    return this.http.get<ApiResponseDTO<ReadStore>>(`${this.apiUrl}${store_id}`).pipe(
      map(response => response.data ?? {} as ReadStore)
    )
  }
}