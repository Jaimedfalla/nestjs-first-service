import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorManager extends Error
{
    private readonly separator:string=' :: ';

    constructor({type,message}:{type: keyof typeof HttpStatus,message:string}) {
        super(`${type} :: ${message}`);
    }

    static createSignatureError(message:string)
    {
        const name = message.split(' :: ')[0];
        const code = name?HttpStatus[name]:HttpStatus.INTERNAL_SERVER_ERROR;
        
        throw new HttpException(message,code);
    }
}