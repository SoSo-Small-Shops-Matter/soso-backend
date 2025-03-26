import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: any) {
    const forbiddenPattern = /[\x00-\x1F\x7F]|<script|<\/script>|<iframe|on\w+=|javascript:|eval\(/i;

    function checkRecursively(val: any, path = ''): void {
      if (typeof val === 'string') {
        if (forbiddenPattern.test(val)) {
          throw new BadRequestException(`${path || '입력 값'}에 제어 문자나 악성 코드가 포함되어 있습니다.`);
        }
      } else if (typeof val === 'object' && val !== null) {
        for (const key of Object.keys(val)) {
          checkRecursively(val[key], path ? `${path}.${key}` : key);
        }
      }
    }

    checkRecursively(value);
    return value;
  }
}
