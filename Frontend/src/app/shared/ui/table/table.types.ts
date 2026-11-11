export interface TableColumn<T = unknown> {
  /** Propiedad de la fila que se muestra (si no se define `value`). */
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  /** Función opcional para formatear o calcular el texto de la celda. */
  value?: (row: T) => string | number | null | undefined;
}

/**
 * Contexto que recibe un <ng-template appTableCell="...">.
 * La columna se expone sin `value` para que no dependa del tipo de la fila:
 * así TableColumn<T> es asignable sin importar qué sea T.
 */
export interface TableCellContext {
  $implicit: unknown;
  column: Pick<TableColumn, 'key' | 'header' | 'align'>;
}
