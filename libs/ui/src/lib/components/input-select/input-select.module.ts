import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectComponent } from './input-select.component';
import { InputModule } from '../input/input.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        InputModule,
        FormsModule,
    ],
    declarations: [
        InputSelectComponent,
    ],
    exports: [
        InputSelectComponent,
    ],
})
export class InputSelectModule {}
