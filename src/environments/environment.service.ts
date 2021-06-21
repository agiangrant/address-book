import { Inject, Injectable } from '@angular/core';
import { Environment, ENVIRONMENT } from './environment-type';

@Injectable()
export class EnvironmentService {
  constructor(@Inject(ENVIRONMENT) private _environment: Environment) {}

  getConfig(): Environment {
    return this._environment;
  }
}
