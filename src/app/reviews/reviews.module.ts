import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ReviewsPageRoutingModule } from './reviews-routing.module'

import { ReviewsPage } from './reviews.page'
import { ReviewListComponent } from 'src/app/reviews/review-list/review-list.component'
import { RouterModule } from '@angular/router'
import { ReviewComponent } from './review/review.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewsPageRoutingModule,
    RouterModule.forChild([
      { path: '', component: ReviewsPage }
    ]),
  ],
  declarations: [
    ReviewsPage,
    ReviewListComponent,
    ReviewComponent,
  ],
  exports: [
    ReviewListComponent, 
    ReviewComponent,
  ]
})
export class ReviewsModule {}
