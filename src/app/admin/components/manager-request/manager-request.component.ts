import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
import { Router } from '@angular/router'
import { RequestStatus } from 'src/app/model/common/request-status.enum'
import { ReadManagerRequest } from 'src/app/model/manager-requests/read-manager-request.interface'
import { UpdateManagerRequest } from 'src/app/model/manager-requests/update-manager-request.interface'
import { ManagerRequestsService } from 'src/app/services/manager-requests.service'

@Component({
  selector: 'app-manager-request',
  templateUrl: './manager-request.component.html',
  styleUrls: ['./manager-request.component.scss'],
  standalone: false,
})
export class ManagerRequestComponent implements OnInit {
  @Input() request!: ReadManagerRequest
  request_id: number | undefined
  status: RequestStatus | undefined
  remark: string = ''

  public RequestStatus = RequestStatus
  
  constructor(
    private managerRequestsService: ManagerRequestsService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.request) {
      this.request_id = this.request.request_id
    }
   }

  async updateManagerRequest() {
    if (!this.request_id) { return }
    if (!this.status) { return }

    const updateData: UpdateManagerRequest = {
      status: this.status,
      remark: this.remark
    }

    this.managerRequestsService.updateManagerRequest(this.request_id, updateData).subscribe({
      next: response=> {
        if (response.success) {
          this.router.navigate(['/'])
        } else {
          console.error('approve manager request failed: ', response.message)
        }
      },
      error: err => {
        console.error('approve manager request error: ', err)
      },
      complete: () => {
        console.log('approve manager request completed')
      }
    })
  }
}
