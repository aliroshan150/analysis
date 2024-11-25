import {BindExtraInterfaceIntoModelType} from '@core/types';

export interface BaseAdminProfileInterface {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  superUser: boolean;
}

export type AdminType<CustomAdminType = {}> = BindExtraInterfaceIntoModelType<BaseAdminProfileInterface, CustomAdminType>;
