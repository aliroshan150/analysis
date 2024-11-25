import {EnvironmentInterface} from '@core/types';
import {DeployTargetEnum} from '@core/enums/deploy-target.enum';

export const environment: EnvironmentInterface = {
  production: true,
  deployTarget: DeployTargetEnum.PRODUCTION,
  loggerUrl: '',
  apiUrl: 'https://accounts.mail.ir/app/',
  siteUrl: '',
};
