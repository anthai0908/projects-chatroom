export class QueryArrayResult<T>{
    constructor(public messages?: Array<string> | undefined, public entities?: Array<T>| undefined){};
}

export class QueryOneResult<T>{
    constructor(public messages? : Array<string>, public entity?: T){};
}