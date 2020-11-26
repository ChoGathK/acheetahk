import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class DtoPipe implements PipeTransform<any> {
    private toValidate;
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
}
