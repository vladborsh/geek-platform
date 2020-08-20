import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFilterComponent } from './list-filter.component';
import { InputModule } from '../input/input.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        InputModule,
        FormsModule,
    ],
    declarations: [
        ListFilterComponent,
    ],
    exports: [
        ListFilterComponent,
    ],
})
export class ListFilterModule {}
