import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class DtoPipe implements PipeTransform<any> {

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  async transform(value, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const messages: string[] = [];

      errors.forEach((e) => {
        if (e.constraints) {
          Object.keys(e.constraints)
            .forEach((info) => messages.push(e.constraints[info]));
        }
      });

      const errorMessage = messages.length > 0
        ? [...new Set(messages)].join(' , ')
        : 'Parameter error';

      throw new UnprocessableEntityException(errorMessage);
    }

    return value;
  }
}
