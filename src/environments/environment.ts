import {EnvironmentInterface} from '@core/types';
import {DeployTargetEnum} from '@core/enums/deploy-target.enum';

export const environment: EnvironmentInterface = {
  production: false,
  deployTarget: DeployTargetEnum.LOCAL,
  loggerUrl: '',
  apiUrl: 'https://accounts.mail.ir/app/',
  siteUrl: '',
};
