import { NgModule } from '@angular/core';
import { environment } from './environment';
import { ENVIRONMENT } from './environment-type';
import { EnvironmentService } from './environment.service';

@NgModule({
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
    EnvironmentService,
  ],
})
export class EnvironmentModule {}
