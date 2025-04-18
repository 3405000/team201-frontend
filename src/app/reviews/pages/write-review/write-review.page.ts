import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiResponseDTO } from 'src/app/shared/model/common/api-response.interface'
import { ReadStore } from 'src/app/shared/model/stores/read-store.interface'
import { ReviewsService } from 'src/app/shared/services/reviews.service'
import { StoresService } from 'src/app/shared/services/stores.service'

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.page.html',
  styleUrls: ['./write-review.page.scss'],
  standalone: false,
})
export class WriteReviewPage implements OnInit {
  private store_id: number | null = null
  store_name: string = 'No store'
  content: string = ''
  selectedFiles: File[] = []
  previewUrls: string[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storesService: StoresService,
    private reviewsService: ReviewsService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getStoreId()
    this.getStoreName()
  }

  submit() {
    this.createReview()
    console.log('입력한 리뷰: ', this.content)
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement
    if (target.files) {
      this.selectedFiles = Array.from(target.files)

      this.previewUrls = this.selectedFiles.map(file =>
        URL.createObjectURL(file)
      )
    }
  }

  getStoreId() {
    const navigation = this.router.getCurrentNavigation()
    // 라우트 파라미터에서 store_id 가져오기
    this.route.paramMap.subscribe(params => {
      this.store_id = Number(params.get('store_id')) || null
      console.log('store_id from route params: ', this.store_id)
    })
  }

  getStoreName() {
    if (!this.store_id) { return }

    this.storesService.getStoreById(this.store_id).subscribe((response: ApiResponseDTO<ReadStore>) => {
      const store = response.data ?? null
      if (store) {
        this.store_name = store.store_name
      }
    })
  }

  createReview() {
    if (!this.store_id) { return }

    if (!this.content || this.content.trim() === '') {
      alert('리뷰 내용을 입력해주세요.')
      return
    }

    const formData = new FormData()
    formData.append('content', this.content) // 리뷰 내용 추가

    // 파일 추가
    this.selectedFiles.forEach(file => {
      formData.append('files', file, file.name) // 'files'라는 이름으로 파일 추가
    })

    this.reviewsService.createReview(this.store_id, formData).subscribe({ // formData 전달
      next: (response) => {
        if (response.success && response.data?.review_id) {
          this.router.navigate(['/stores', this.store_id], {
            state: { refresh: true },
          })
        } else {
          console.error('create review failed: ', response.message)
        }
      },
      error: err => {
        console.error('create review error: ', err)
      },
      complete: () => {
        console.log('create review completed')
      }
    })
  }
}
