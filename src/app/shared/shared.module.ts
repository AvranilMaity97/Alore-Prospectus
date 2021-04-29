import { NgModule } from '@angular/core';
import { AddSegmentComponent } from './components/popups/add-segment/add-segment.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [AddSegmentComponent, FilterPipe],
  imports: [
    PickerModule,
    EmojiModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AddSegmentComponent, PickerModule, EmojiModule, FilterPipe],
})
export class SharedModule {}
