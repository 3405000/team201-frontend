import { Component, Input } from '@angular/core'
import { ReadEvent } from 'src/app/shared/model/events/read-event.interface'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  standalone: false,
})
export class EventComponent {
  @Input() event!: ReadEvent
}
