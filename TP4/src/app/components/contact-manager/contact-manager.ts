import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact';
import { Contact, NouveauContact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-manager',
  imports: [],
  templateUrl: './contact-manager.html',
  styleUrl: './contact-manager.scss',
})
export class ContactManager implements OnInit {
  private service = inject(ContactService);

  contacts = signal<Contact[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  formError = signal<string | null>(null);

  recherche = signal('');
  filtres = computed(() => {
    const q = this.recherche().toLowerCase().trim();
    return q.length === 0
      ? this.contacts()
      : this.contacts().filter(c =>
          c.nom.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.tel.toLowerCase().includes(q)
        );
  });

  enEdition = signal<Contact | null>(null);

  ngOnInit() {
    this.charger();
  }

  charger() {
    this.loading.set(true);
    this.error.set(null);
    this.service.getAll().subscribe({
      next: data => {
        this.contacts.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Impossible de charger (json-server est-il lance sur :3000 ?)');
        this.loading.set(false);
      },
    });
  }

  enregistrer(form: { nom: string; email: string; tel: string }) {
    this.formError.set(null);
    if (!this.isEmailValid(form.email)) {
      this.formError.set('Email invalide');
      return;
    }

    const enEdition = this.enEdition();

    if (enEdition) {
      const maj: Contact = { ...enEdition, ...form };
      this.service.update(maj).subscribe({
        next: c => {
          this.contacts.update(list => list.map(x => x.id === c.id ? c : x));
          this.annulerEdition();
        },
        error: (err: Error) => this.error.set(err.message || 'Echec de la modification'),
      });
    } else {
      this.service.create(form as NouveauContact).subscribe({
        next: c => this.contacts.update(list => [...list, c]),
        error: (err: Error) => this.error.set(err.message || "Echec de l'ajout"),
      });
    }
  }

  editer(contact: Contact) {
    this.enEdition.set(contact);
  }

  annulerEdition() {
    this.enEdition.set(null);
  }

  supprimer(contact: Contact) {
    if (!confirm(`Supprimer ${contact.nom} ?`)) return;

    const avant = this.contacts();
    this.contacts.update(list => list.filter(c => c.id !== contact.id));

    this.service.delete(contact.id).subscribe({
      next: () => {},
      error: (err: Error) => {
        this.contacts.set(avant);
        this.error.set(err.message || 'Echec de la suppression');
      },
    });
  }

  onSearch(event: Event) {
    this.recherche.set((event.target as HTMLInputElement).value);
  }

  private isEmailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }
}
