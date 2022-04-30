import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ValidationBodyPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    let errorMessages = [];
    if (errors.length) {
      errorMessages = errors.map((err) => {
        if (err.constraints) {
          return {
            messages: Object.values(err.constraints),
            field: err.property
          }
        }
      });
      throw new BadRequestException(
         errorMessages,
      );
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

export const validationPipe = new ValidationBodyPipe();
