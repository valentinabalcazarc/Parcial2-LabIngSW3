/** Fecha local de hoy en formato ISO (yyyy-mm-dd), el mismo que entrega <input type="date">. */
export function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Convierte "2000-05-01" en "01/05/2000" para mostrarlo en tablas.
 * Se hace con texto (sin `new Date`) para evitar desfases por zona horaria.
 */
export function formatIsoDate(iso: string | null | undefined): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? '');
  return match ? `${match[3]}/${match[2]}/${match[1]}` : '';
}
