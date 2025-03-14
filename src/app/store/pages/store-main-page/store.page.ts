import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiResponseDTO } from 'src/app/model/common/api-response.interface'
import { ReadEvent } from 'src/app/model/events/read-event.interface'
import { ReadReview } from 'src/app/model/reviews/read-review.interface'
import { ReadStore } from 'src/app/model/stores/read-store.interface'
import { StoresService } from 'src/app/services/stores.service'

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
  standalone: false,
})
export class StorePage implements OnInit {
  store: ReadStore | null = null
  event: ReadEvent | null = null
  reviews: ReadReview[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storesService: StoresService
  ) { }

  ngOnInit() {
    const store_id = Number(this.route.snapshot.paramMap.get('store_id'))
    if (store_id) {
      // 가게 정보 가져오기
      this.storesService.getStoreById(store_id).subscribe((response: ApiResponseDTO<ReadStore>) => {
        this.store = response.data ?? null
      })

      // 최신 이벤트 가져오기
      this.storesService.getLastestEventByStoreId(store_id).subscribe({
        next: (response: ApiResponseDTO<ReadEvent>) => {
          this.event = response.data ?? null
        },
        error: (err) => {
          console.error('Failed to Retriving Event', err)
        }
      })

      // 해당 가게 리뷰 가져오기
      this.storesService.getReviewsByStoreId(store_id).subscribe({
        next: (response: ApiResponseDTO<ReadReview[]>) => {
          this.reviews = response.data ?? []
        },
        error: (err) => {
          console.error('Failed to Retriving Reviews', err)
        }
      })
    }
  }

  goMenuPage() {
    this.router.navigate([`menu`], { relativeTo: this.route })
    console.log('go menu page')
  }
}