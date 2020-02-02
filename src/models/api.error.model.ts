
export class ApiErrorModel {

    private _status: number;
    private _message: string;

    constructor(status: number, message: string) {
        this._status = status;
        this._message = message;
    }

    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }
}
