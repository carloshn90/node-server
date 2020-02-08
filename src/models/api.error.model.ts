
export class ApiErrorModel extends Error {

    private _status: number;

    constructor(status: number, message: string) {
        super(message);
        this._status = status;
        Error.captureStackTrace(this, this.constructor);
    }

    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }
}
