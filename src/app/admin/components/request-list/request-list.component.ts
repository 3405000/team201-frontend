import { Component, Input, OnInit } from '@angular/core'
import { RequestPage } from 'src/app/shared/model/common/request-page.enum'
import { ReadManagerRequest } from 'src/app/shared/model/manager-requests/read-manager-request.interface'
import { ReadStoreRequest } from 'src/app/shared/model/store-requests/read-store-request.interface'
import { ManagerRequestsService } from 'src/app/shared/services/manager-requests.service'
import { StoreRequestsService } from 'src/app/shared/services/store-requests.service'

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  standalone: false,
})
export class RequestListComponent implements OnInit {
  @Input() requestPage!: RequestPage
  requests: ReadManagerRequest[] | ReadStoreRequest[] = []

  constructor(
    private managerRequestsService: ManagerRequestsService,
    private storeRequestsService: StoreRequestsService,
  ) { }

  ngOnInit() {
    switch (this.requestPage) {
      case RequestPage.MANAGER_REQUEST:
        this.loadManagerRequests()
        break
      case RequestPage.STORE_REQUEST:
        this.loadStoreRequests()
        break
      default:
        console.warn("Unknown requestPage: ", this.requestPage)
    }
  }

  loadManagerRequests() {
    this.managerRequestsService.readAllManagerRequests().subscribe({
      next: response => {
        if (response.success) {
          this.requests = response.data || []
        } else {
          console.error(response.message)
        }
      },
      error: err => {
        console.error('Error fetching manager requests: ', err)
      },
      complete: () => {
        console.log('Fetching manager requests completed')
      }
    })
  }

  loadStoreRequests() {
    this.storeRequestsService.readAllStoreRequests().subscribe({
      next: response => {
        if (response.success) {
          this.requests = response.data || []
        } else {
          console.error(response.message)
        }
      },
      error: err => {
        console.error('Error fetching store requests: ', err)
      },
      complete: () => {
        console.log('Fetching store requests completed')
      }
    })
  }

  getPageTitle(): string {
    return (this.requestPage == RequestPage.MANAGER_REQUEST) ? "Manager Requests" : "Store Requests"
  }
}
