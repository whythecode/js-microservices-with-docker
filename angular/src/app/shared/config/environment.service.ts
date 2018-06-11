import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {

  public config!: IEnvironmentConfig;

  private defaultConfig: IEnvironmentConfig = {
    BASE_PATH: '/',
    PEOPLE_PATH: 'assets/data/people.json',
  };

  private ENV_PATH = 'env.json';

  constructor (private http: HttpClient) {}

  public loadEnvironment () {

    return this.http
               .get<IEnvironmentConfig>(this.ENV_PATH)
               .toPromise()
               .then(config => this.config = Object.assign({}, this.defaultConfig, config))
               .catch(e => {

                 console.log('Could not load ENV file!', e);
                 throw e;
               });
  }
}

export interface IEnvironmentConfig {
  BASE_PATH?: string;
  PEOPLE_PATH?: string;
}
