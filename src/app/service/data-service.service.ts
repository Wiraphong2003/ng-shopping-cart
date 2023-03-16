import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  apiEndpoint = 'http://localhost:9999/webAPI_ProjectWebFinal';
  FoodServic: any;
  constructor() { }
}
