import {DeployTargetEnum} from '@core/enums/deploy-target.enum';

export interface EnvironmentInterface<CustomInterface = {}>
  extends CustomInterface {
  production: boolean;
  deployTarget: DeployTargetEnum;
  loggerUrl: string;
  apiUrl: string;
  siteUrl: string;
}

export type CoreHttpInterceptorInitialConfigType = {
  apiUrl: string,
  loggerUrl?: string
}

export type ExtraInterfaceIntoModelType<InputType> = {
  [key in keyof InputType]: InputType[key];
};

export type BindExtraInterfaceIntoModelType<MainInterface, ExtraParamsInterface extends {} = {}> = ExtraInterfaceIntoModelType<MainInterface> & ExtraInterfaceIntoModelType<ExtraParamsInterface>;

export type PaginationInterface<ExtraParamsInterface = {}> = BindExtraInterfaceIntoModelType<{
  page: number;
  size: number;
  sort?: string;
}, ExtraParamsInterface>

export interface SortInterface {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export type SortType = "DESC" | "ASC";

export type SortNullHandlingType = "NATIVE" | "NULLS_FIRST" | "NULLS_LAST";

export interface SortedInterface {
  ascending: boolean;
  descending: boolean;
  direction: SortType;
  ignoreCase: boolean;
  nullHandling: SortNullHandlingType;
  property: string;
}

export interface PageableInterface {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: SortInterface | Array<SortedInterface>;
  unpaged: boolean;
}

export interface PageResponseInterface<ContentType = any> {
  content: ContentType[];
  empty: boolean;
  first: boolean | null;
  last: boolean | null;
  number: number | null;
  numberOfElements: number;
  pageable: PageableInterface | null;
  size: number;
  sort: SortInterface | Array<SortedInterface> | null;
  totalElements: number;
  totalPages: number;
}
