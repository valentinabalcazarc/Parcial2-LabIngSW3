import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-form-error',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './form-error.css',
  templateUrl: './form-error.html',
})
export class FormError {}
