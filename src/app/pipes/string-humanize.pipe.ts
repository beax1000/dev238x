import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringHumanize'
})
export class StringHumanizePipe implements PipeTransform {
    // transfer camel case into human friendly strings
    transform(value: any, args?: any) {
        if ((typeof value) !== 'string') return value;

        value = value.split(/(?=[A-Z])/).join(' ');
        value = value[0].toUpperCase() + value.slice(1);
        return value;
    }
}