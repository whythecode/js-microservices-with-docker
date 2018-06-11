import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnvironmentService } from '../config/environment.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private PEOPLE_PATH: string;

  constructor (private http: HttpClient,
               private environmentService: EnvironmentService) {

    this.PEOPLE_PATH = this.environmentService.config.PEOPLE_PATH;
  }

  getAll (): Observable<Person[]> {

    return this.http.get<Person[]>(this.PEOPLE_PATH);
  }

  search (q: string): Observable<Person[]> {

    if (!q || q === '*') {
      q = '';
    }

    q = q.toLowerCase();

    return this.getAll().pipe(
      map((data: Person[]) => {

          return data.map(item => this.getFromStorageOrAll(item.id, data))
                     .filter(item => JSON.stringify(item).toLowerCase().includes(q));
        },
      ),
    );
  }

  get(id: number): Observable<Person> {

    return this.getAll().pipe(
      map((all: Person[]) => this.getFromStorageOrAll(id, all)),
    );
  }

  getFromStorageOrAll (id: number, all: Person[]): Person {

    const key = `person${id}`;

    return localStorage[key]
      ? JSON.parse(localStorage[key])
      : all.find(e => e.id === id);
  }

  save(person: Person) {

    localStorage[`person${person.id}`] = JSON.stringify(person);
  }
}

export class Address {
  street: string;
  city: string;
  suite: string;
  zipcode: string;

  constructor(obj?: any) {
    this.street = obj && obj.street || null;
    this.city = obj && obj.city || null;
    this.suite = obj && obj.state || null;
    this.zipcode = obj && obj.zipcode || null;
  }
}

export class Person {
  id: number;
  name: string;
  phone: string;
  address: Address;

  constructor(obj?: any) {
    this.id = obj && Number(obj.id) || null;
    this.name = obj && obj.name || null;
    this.phone = obj && obj.phone || null;
    this.address = obj && obj.address || null;
  }
}
