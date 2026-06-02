import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Contact, NouveauContact } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/contacts';

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url).pipe(
      catchError(() =>
        throwError(() => new Error('Impossible de charger (json-server est-il lance sur :3000 ?)'))
      )
    );
  }

  create(contact: NouveauContact): Observable<Contact> {
    return this.http.post<Contact>(this.url, contact).pipe(
      catchError(() => throwError(() => new Error("Echec de l'ajout")))
    );
  }

  update(contact: Contact): Observable<Contact> {
    return this.http.patch<Contact>(`${this.url}/${contact.id}`, contact).pipe(
      catchError(() => throwError(() => new Error('Echec de la modification')))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError(() => throwError(() => new Error('Echec de la suppression')))
    );
  }
}
