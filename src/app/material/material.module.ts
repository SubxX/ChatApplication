import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatBadgeModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatCardModule
} from '@angular/material';

const material = [
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatBadgeModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatCardModule
];



@NgModule({
  declarations: [],
  imports: [
    material
  ],
  exports: [
    material
  ]
})
export class MaterialModule { }
