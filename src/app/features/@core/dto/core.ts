/**
 * this abstract class inherited in all abstract classes for development and skleton mode of components.
 * **(usage: {className} extends ApiDTO&lt;{interfaceName}&gt; => ApiDTO extends Dummy `so all classes has isDummy attribute`)**
 */
export abstract class Dummy {
  [key: string]: any;

  isDummy: boolean;

  protected constructor(isDummy?: boolean) {
    this.isDummy = isDummy ?? false;
  }
}

/**
 * we use this abstract for all models that have crud api call
 * this abstract has getApiDTO method and fillFromPartial to get valid object for api-call and fill from partial object( to prevent making new instance of models in development )
 */
export abstract class ApiDTO<ChildInterface> extends Dummy {

  protected ignoreKeys: (keyof Partial<this>)[] = [
    'create_date', 'last_update_date', 'is_deleted'
  ];

  protected constructor(isDummy: boolean = false) {
    super(isDummy);
  }

  abstract getInterfaceObject(): Partial<ChildInterface>;

  getApiDTO(force?: boolean): any {
    if (force || !this.isDummy) {
      let keys: string[] = Object.keys(this)
        .filter((key) => (key !== 'ignoreKeys' && key !== 'isDummy'))
        .filter((key) => !this.ignoreKeys.includes(key))
        .filter((key) => this.hasFilled(key));

      let partial: Partial<this> = {};
      keys.forEach((key: keyof Partial<this>) => {
        if (typeof this[key] === 'object') {
          if (Array.isArray(this[key])) {
            (<any[]>(partial[key as keyof Partial<this>])) = (<any[]>this[key])
              .map(item => {
                if (typeof item.getApiDTO === 'function') {
                  return item.getApiDTO(force);
                } else {
                  return item;
                }
              });
          } else {
            if (typeof this[key]?.getApiDTO === 'function') {
              partial[key] = this[key].getApiDTO(force);
            } else {
              partial[key] = this[key];
            }
          }
        } else {
          partial[key] = this[key];
        }
      });
      return partial;
    } else {
      // TODO: handle dummy later
    }
  }

  /**
   * @description update any fields that have a value in given data and clear other fields (fill other fields with undefined)
   * @param partial
   */
  resetByPartial(partial: Partial<ChildInterface> = {}) {
    let allKeys: Array<keyof Partial<ChildInterface>> = Object.keys(this.getInterfaceObject())
      .filter(item => !this.ignoreKeys.some(key => key === item))
      .map(key => key as keyof Partial<ChildInterface>);

    if (partial) {
      for (let i = 0; i < allKeys.length; i++) {
        if (Array.isArray(this[(allKeys[i] as keyof Partial<ChildInterface>) as keyof ApiDTO<Partial<ChildInterface>>])) {
          this[(allKeys[i] as keyof Partial<ChildInterface>) as keyof ApiDTO<Partial<ChildInterface>>] = partial[allKeys[i] as keyof ChildInterface] ?? [];
        } else {
          this[(allKeys[i] as keyof Partial<ChildInterface>) as keyof ApiDTO<Partial<ChildInterface>>] = partial[allKeys[i] as keyof ChildInterface] ?? undefined;
        }
      }
    }
  }

  /**
   * @description update except fields that have a value in given data just clear other fields (fill other fields with undefined)
   * @param partial
   */
  resetExceptPartial(partial: Partial<ChildInterface> = {}) {
    let allKeys: Array<keyof Partial<ChildInterface>> = Object.keys(this.getInterfaceObject())
      .filter(item => !this.ignoreKeys.some(key => key === item))
      .filter(item => !Object.keys(partial).some(key => key === item))
      .map(key => key as keyof Partial<ChildInterface>);

    if (partial) {
      for (let i = 0; i < allKeys.length; i++) {
        if (Array.isArray(this[(allKeys[i] as keyof Partial<ChildInterface>) as keyof ApiDTO<Partial<ChildInterface>>])) {
          this[(allKeys[i] as keyof Partial<ChildInterface>) as keyof ApiDTO<Partial<ChildInterface>>] = partial[allKeys[i] as keyof ChildInterface] ?? [];
        } else {
          this[(allKeys[i] as keyof Partial<ChildInterface>) as keyof ApiDTO<Partial<ChildInterface>>] = partial[allKeys[i] as keyof ChildInterface] ?? undefined;
        }
      }
    }
  }

  protected hasFilled(key: string): boolean {
    switch (typeof this[key]) {
      case "string":
        return this[key] !== null && this[key] !== undefined;
      case "boolean":
        return (this[key] !== null && this[key] !== undefined)
      case "number":
      case "bigint":
        return (this[key] !== null && this[key] !== undefined);
      case "object":
        if (Array.isArray(this[key])) {
          return true;
        } else return (this[key] !== null);
      case "undefined":
        return false;
      case null:
        return true;
      default:
        return false;
    }
  }

}

/**
 * usage: main statuses enum for any html element **LOADING**, **ERROR**, **RESOLVED**
 */
export enum StatusEnum {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  RESOLVED = 'RESOLVED',
}

/**
 * usage: handle and manage status of all html elements that have [**LOADING**, **ERROR**, **RESOLVED**] status
 */
export abstract class StatusDTO {

  protected constructor(initialStatus?: StatusEnum) {
    this._status = initialStatus ?? StatusEnum.LOADING;
  }

  protected _status: StatusEnum;

  get status(): StatusEnum {
    return this._status;
  }

  get isLoading(): boolean {
    return this._status === StatusEnum.LOADING;
  }

  get isResolved(): boolean {
    return this._status === StatusEnum.RESOLVED;
  }

  get isError(): boolean {
    return this._status === StatusEnum.ERROR;
  }

  loading() {
    this._status = StatusEnum.LOADING;
  }

  resolved() {
    this._status = StatusEnum.RESOLVED;
  }

  error() {
    this._status = StatusEnum.ERROR;
  }
}

/**
 * to create instance with behaviour of **StatusDTO**
 */
export class Status extends StatusDTO {
  constructor(initialStatus?: StatusEnum) {
    super(initialStatus);
  }
}
