import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponseDTO } from 'src/app/model/common/api-response.interface';
import { Store } from 'src/app/model/stores/read-store.interface';
import { StoreService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
  standalone: false,
})
export class StorePage implements OnInit {
  store: Store | null = null

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    const storeId = Number(this.route.snapshot.paramMap.get('id'))
    if (storeId) {
      this.storeService.getStoreById(storeId).subscribe((response: ApiResponseDTO<Store>) => {
        this.store = response.data ?? null
      })
    }
  }
}
