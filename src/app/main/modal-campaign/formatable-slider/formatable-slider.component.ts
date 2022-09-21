import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formatable-slider',
  templateUrl: './formatable-slider.component.html',
  styleUrls: ['./formatable-slider.component.scss'],
})
export class FormatableSliderComponent {
  @Output() sliderValueEvent = new EventEmitter<number>();

  sliderValue = 0;

  constructor() {}

  formatLabel(value: number) {
    return value;
  }

  modelChanged() {
    this.sliderValueEvent.emit(this.sliderValue);
  }
}
