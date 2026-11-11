import { Directive, TemplateRef, inject, input } from '@angular/core';
import { TableCellContext } from './table.types';

/**
 * Permite personalizar una columna de la tabla desde fuera:
 *
 *   <app-table [columns]="cols" [rows]="rows">
 *     <ng-template appTableCell="estado" let-row>
 *       <app-badge>{{ row.estado }}</app-badge>
 *     </ng-template>
 *   </app-table>
 */
@Directive({
  selector: 'ng-template[appTableCell]',
  standalone: true,
})
export class TableCell {
  /** `key` de la columna que reemplaza. */
  readonly key = input.required<string>({ alias: 'appTableCell' });
  readonly template = inject<TemplateRef<TableCellContext>>(TemplateRef);
}
