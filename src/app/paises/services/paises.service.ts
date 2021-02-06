import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { PaisSmall, Pais } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private baseUrl = 'https://restcountries.eu/rest/v2';

  get regiones(): string[] {
    return [...this.regions];
  }

  constructor(private http: HttpClient) { }

  getPaisesByRegion(region: string): Observable<PaisSmall[]> {
    const url = `${this.baseUrl}/region/${region}?fields=alpha3Code;name`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisByAlphaCode(alpha: string): Observable<Pais | null> {
    if (!alpha) {
      return of(null);
    }

    const url = `${this.baseUrl}/alpha/${alpha}`;
    return this.http.get<Pais>(url);
  }

  getPaisByAlphaCodeSmall(alpha: string): Observable<PaisSmall> {
    const url = `${this.baseUrl}/alpha/${alpha}?fields=alpha3Code;name`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesByAlpha(alpha: string[]): Observable<PaisSmall[]> {
    if (!alpha) {
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = [];

    alpha.forEach(codigo => {
      const peticion = this.getPaisByAlphaCodeSmall(codigo);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);
  }
}
