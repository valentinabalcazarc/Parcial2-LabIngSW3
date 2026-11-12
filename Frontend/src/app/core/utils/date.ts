/** Fecha local de hoy en formato ISO (yyyy-mm-dd), el mismo que entrega <input type="date">. */
export function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

/** Hora local actual en formato HH:mm, el mismo que entrega <input type="time">. */
export function nowTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

/**
 * Convierte "2000-05-01" (o "2000-05-01T09:30:00") en "01/05/2000" para mostrarlo en tablas.
 * Se hace con texto (sin `new Date`) para evitar desfases por zona horaria.
 */
export function formatIsoDate(iso: string | null | undefined): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? '');
  return match ? `${match[3]}/${match[2]}/${match[1]}` : '';
}

/** Extrae "HH:mm" de "2026-12-15T09:30:00". */
export function formatIsoTime(iso: string | null | undefined): string {
  const match = /T(\d{2}):(\d{2})/.exec(iso ?? '');
  return match ? `${match[1]}:${match[2]}` : '';
}
