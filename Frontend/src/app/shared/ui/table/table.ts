import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import { TableCell } from './table-cell';
import { TableColumn } from './table.types';

@Component({
  imports: [NgTemplateOutlet],
  selector: 'app-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './table.css',
  templateUrl: './table.html',
})
export class Table<T = unknown> {
  readonly columns = input.required<readonly TableColumn<T>[]>();
  readonly rows = input<readonly T[]>([]);
  /** Descripción accesible de la tabla (solo para lectores de pantalla). */
  readonly caption = input<string>('');
  readonly emptyMessage = input<string>('No hay registros para mostrar.');

  private readonly customCells = contentChildren(TableCell, { descendants: true });

  protected readonly cellTemplates = computed(
    () => new Map(this.customCells().map((cell) => [cell.key(), cell.template] as const)),
  );

  protected cellText(row: T, column: TableColumn<T>): string {
    const raw = column.value
      ? column.value(row)
      : (row as unknown as Record<string, unknown>)[column.key];
    return raw === null || raw === undefined || raw === '' ? '—' : String(raw);
  }
}
