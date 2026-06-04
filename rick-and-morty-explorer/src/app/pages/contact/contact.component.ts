import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    nom: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submitted = signal(false);
  success = signal(false);

  get nom() { return this.form.get('nom')!; }
  get email() { return this.form.get('email')!; }
  get message() { return this.form.get('message')!; }

  onSubmit() {
    this.submitted.set(true);
    if (this.form.invalid) return;
    this.success.set(true);
    this.form.reset();
    this.submitted.set(false);
  }
}
