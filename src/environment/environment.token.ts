import { InjectionToken } from '@angular/core';
import { Environment } from './environment.type';

export const ENV = new InjectionToken<Environment>('env');
