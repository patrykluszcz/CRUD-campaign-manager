import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';

const materialModules = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  OverlayModule,
  CdkTreeModule,
  MatSlideToggleModule,
  MatSliderModule,
];

@NgModule({
  imports: [CommonModule, ...materialModules],

  exports: [...materialModules],
})
export class MaterialModule {}
