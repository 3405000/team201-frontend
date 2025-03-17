import { Component, OnInit, AfterViewInit } from '@angular/core'
import { ReadStore } from 'src/app/shared/model/stores/read-store.interface'
import { NearbyStoresService } from 'src/app/shared/services/nearby-stores.service'

@Component({
  selector: 'app-nearby-stores',
  templateUrl: './nearby-stores.component.html',
  styleUrls: ['./nearby-stores.component.scss'],
  standalone: false
})
export class NearbyStoresComponent implements OnInit, AfterViewInit {
  stores: ReadStore[] = []
  filteredStores: ReadStore[] = []

  constructor(private storesService: NearbyStoresService) {}

  ngOnInit() {
    this.storesService.getAllStores().subscribe(
      (data: ReadStore[]) => {
        this.stores = data
        this.filteredStores = data // 초기에는 모든 가게 표시
        this.sendStoresToMap(false)
      },
      (error) => console.error('가게 데이터 로딩 실패:', error)
    )
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sendStoresToMap(false)
    }, 1000)
  }

  // 검색
  onSearch(query: string) {
    const searchQuery = query.trim().toLowerCase() // 검색어 소문자로 변환
  
    if (!searchQuery) {
      return
    }
  
    // 가게 이름을 먼저 검색해서 store_id를 찾는다
    const foundStore = this.stores.find(store => 
      store.store_name.toLowerCase().includes(searchQuery)
    )
  
    if (!foundStore) {
      this.filteredStores = []
      return
    }
  
    const storeId = foundStore.store_id
  
    // store_id로 상세 정보 조회
    this.storesService.getStoreById(storeId).subscribe(
      (data) => {
        this.filteredStores = data ? [data] : []
        this.sendStoresToMap(true)
      },
      (error) => {
        this.filteredStores = []
      }
    )
  }

  // map iframe에 가게 데이터를 전달
  sendStoresToMap(isSearchPerformed: boolean) {
    const iframe = document.getElementById('map-iframe') as HTMLIFrameElement
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ stores: this.filteredStores, isSearchPerformed }, '*')
    }
  }
}