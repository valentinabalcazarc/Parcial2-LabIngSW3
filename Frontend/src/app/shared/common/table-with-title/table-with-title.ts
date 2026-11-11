import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  booleanAttribute,
} from '@angular/core';
import { Heading, Spinner, Table, TableCell, TableColumn } from '../../ui';

@Component({
  imports: [Heading, Spinner, Table],
  selector: 'app-table-with-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './table-with-title.css',
  templateUrl: './table-with-title.html',
})
export class TableWithTitle<T = unknown> {
  readonly title = input.required<string>();
  readonly columns = input.required<readonly TableColumn<T>[]>();
  readonly rows = input<readonly T[]>([]);
  /** Descripción accesible de la tabla. Si no se indica, se usa el título. */
  readonly caption = input<string>('');
  readonly emptyMessage = input<string>('No hay registros para mostrar.');
  readonly loading = input(false, { transform: booleanAttribute });

  protected readonly cells = contentChildren(TableCell, { descendants: true });

  protected readonly tableCaption = computed(() => this.caption() || this.title());
}
