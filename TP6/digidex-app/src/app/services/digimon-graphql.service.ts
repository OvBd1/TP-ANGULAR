import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable, filter } from 'rxjs';
import { Digimon, DigimonPage } from '../models/digimon.model';

const LISTE = gql`
  query Digimons($page: Int!, $pageSize: Int!, $name: String) {
    digimons(page: $page, pageSize: $pageSize, name: $name) {
      totalElements
      totalPages
      currentPage
      items { id name image }
    }
  }
`;

const DETAIL = gql`
  query Digimon($id: Int!) {
    digimon(id: $id) {
      id
      name
      releaseDate
      levels
      types
      attributes
      descriptions
      images { href }
      priorEvolutions { id digimon condition image }
      nextEvolutions { id digimon condition image }
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class DigimonGraphqlService {
  private apollo = inject(Apollo);

  getDigimons(page = 0, pageSize = 20, name?: string): Observable<DigimonPage> {
    return this.apollo
      .watchQuery<{ digimons: DigimonPage }>({
        query: LISTE,
        variables: { page, pageSize, name },
      })
      .valueChanges.pipe(
        filter(result => !!result.data),
        map(result => result.data!.digimons as DigimonPage)
      );
  }

  getDigimon(id: number): Observable<Digimon> {
    return this.apollo
      .watchQuery<{ digimon: Digimon }>({
        query: DETAIL,
        variables: { id },
      })
      .valueChanges.pipe(
        filter(result => !!result.data),
        map(result => result.data!.digimon as Digimon)
      );
  }
}
