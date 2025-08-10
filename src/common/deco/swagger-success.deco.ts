import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiSuccessResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              message: { type: 'string', example: 'Success' },
              status: { type: 'number', example: 200 },
              result: { $ref: getSchemaPath(model) },
            },
            required: ['message', 'status', 'result'],
          },
        ],
      },
    }),
  );
};
