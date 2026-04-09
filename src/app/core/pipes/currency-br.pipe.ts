import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyBr', standalone: false })
export class CurrencyBrPipe implements PipeTransform {
  transform(value: number | undefined | null, symbol = 'R$'): string {
    if (value == null) return `${symbol} 0,00`;
    return `${symbol} ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}
