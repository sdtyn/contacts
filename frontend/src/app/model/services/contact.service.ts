import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api';

const CONTACT_SERVICE = 'contacts';
const CITY_SERVICE = 'cities';
const STREET_SERVICE = 'streets';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getAll(offset, limit) {
    return this.http.get<any>(`${baseUrl}/${CONTACT_SERVICE}/list/${offset}/${limit}/`);
  }

  getContactCount() {
    return this.http.get<any>(baseUrl + '/' + CONTACT_SERVICE + '/count', {});
  }

  getContactById(id) {
    return this.http.get<any>(`${baseUrl}/${CONTACT_SERVICE}/${id}`);
  }

  getContactsByName(name) {
    return this.http.get<any>(`${baseUrl}/${CONTACT_SERVICE}/name/${name}`);
  }

  create(data) {
    return this.http.post<any>(baseUrl + '/' + CONTACT_SERVICE + '/create', data);
  }

  update(data) {
    return this.http.post<any>(`${baseUrl}/${CONTACT_SERVICE}/update/${data.id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${CONTACT_SERVICE}/${id}`);
  }

  getCities(postalCode) {
    return this.http.get(`${baseUrl}/${CITY_SERVICE}/${postalCode}`);
  }

  getStreets(postalCode, city) {
    return this.http.get(`${baseUrl}/${STREET_SERVICE}/${postalCode}/${city}`);
  }
}
