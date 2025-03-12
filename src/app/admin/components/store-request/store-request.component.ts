import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { RequestStatus } from 'src/app/model/common/request-status.enum'
import { ReadStoreRequest } from 'src/app/model/store-requests/read-store-request.interface'
import { UpdateStoreRequest } from 'src/app/model/store-requests/update-store-request.interface'
import { StoreRequestsService } from 'src/app/services/store-requests.service'

@Component({
  selector: 'app-store-request',
  templateUrl: './store-request.component.html',
  styleUrls: ['./store-request.component.scss'],
  standalone: false,
})
export class StoreRequestComponent implements OnInit {
  @Input() request!: ReadStoreRequest
  request_id: number | undefined
  status: RequestStatus | undefined
  remark: string = ''

  public RequestStatus = RequestStatus

  constructor(
    private storeRequestsService: StoreRequestsService,
    private router: Router,
  ) { }

  ngOnInit( ) {
    if (this.request) {
      this.request_id = this.request.request_id
    }
  }

  async updateStoreRequest() {
    console.log('update store request on')

    if (!this.request_id) { return }
    if (!this.status) { return }

    const updateData: UpdateStoreRequest = {
      status: this.status,
      remark: this.remark
    }

    this.storeRequestsService.updateStoreRequest(this.request_id, updateData).subscribe({
      next: response=> {
        console.log('update store request service on')
        if (response.success) {
          this.router.navigate(['/'])
        } else {
          console.error('approve store request failed: ', response.message)
        }
      },
      error: err => {
        console.error('approve store request error: ', err)
      },
      complete: () => {
        console.log('approve store request completed')
      }
    })
  }
}
