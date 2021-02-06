import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/paises.interface';

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

  getPaisesByRegion(region: string): Observable<Pais[]> {
    const url = `${this.baseUrl}/region/${region}?fields=alpha3Code;name`;
    return this.http.get<Pais[]>(url);
  }
}
