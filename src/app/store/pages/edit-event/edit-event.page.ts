import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ApiResponseDTO } from 'src/app/shared/model/common/api-response.interface'
import { ReadEvent } from 'src/app/shared/model/events/read-event.interface'
import { UpdateEvent } from 'src/app/shared/model/events/update-event.interface'
import { EventsService } from 'src/app/shared/services/event.services'

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  standalone: false,
})
export class EditEventPage implements OnInit {
  private event_id!: number
  private store_id!: number
  event!: ReadEvent | null

  title: string = ''
  description: string = ''
  start_date: string = new Date().toISOString().slice(0, 16)
  end_date: string = new Date().toISOString().slice(0, 16)
  is_canceled: boolean = false

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private location: Location,
  ) { }

  ngOnInit() {
    if (this.event) {
      this.event_id = this.event!.event_id
      this.store_id = this.event!.store_id
    } else {
      this.event_id = Number(this.route.snapshot.paramMap.get('event_id'))
      this.store_id = Number(this.route.snapshot.paramMap.get('store_id'))
    }
    
    this.loadEvent()
  }

  loadEvent() {
    if (this.event_id) {
      this.eventsService.getEventById(this.store_id, this.event_id).subscribe({
        next: (response: ApiResponseDTO<ReadEvent>) => {
          this.event = response.data || null

          if (this.event) {
            this.title = this.event.title || ''
            this.description = this.event.description || ''
            this.start_date = new Date(this.event.start_date).toISOString()
            this.end_date = this.event.end_date.toISOString()
            this.is_canceled = this.event.is_canceled
          }
        },
        error: (err) => {
          console.error('Failed to Retriving Event ', err)
        },
        complete: () => {
          console.log('get event completed')
        }
      })
    }
  }

  updateEvent() {
    const updateEvent: UpdateEvent = {
      title: this.title,
      description: this.description,
      start_date: new Date(this.start_date),
      end_date: new Date(this.end_date),
      is_canceled: this.is_canceled
    }

    this.eventsService.updateEvent(this.store_id, this.event_id, updateEvent).subscribe({
      next: response => {
        if (response.success) {
          this.location.back()
        } else {
          console.error('edit event failed: ', response.message)
        }
      },
      error: err => {
        console.error('edit event error: ', err)
      },
      complete: () => {
        console.log('edit event completed')
      }
    })
  }

  deleteEvent() {
    this.eventsService.deleteEvent(this.store_id, this.event_id).subscribe({
      next: response => {
        if (response.success) {
          this.location.back()
        } else {
          console.error('delete event failed: ', response.message)
        }
      },
      error: err => {
        console.error('delete event error: ', err)
      },
      complete: () => {
        console.log('delete event completed')
      }
    })
  }
}
