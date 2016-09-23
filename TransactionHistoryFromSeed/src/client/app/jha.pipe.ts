import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'jhaDateString'
})
export class JhaDateStringPipe implements PipeTransform {
	transform(value: string): string {

		if (value && value.length === 8) {

			let year = value.slice(4, 8);
			let month = value.slice(0, 2);
			let day = value.slice(2, 4);
			return [month, day, year].join('/');
		}

		return "";
	}
}

@Pipe({
	name: 'jhaMoney'
})
export class JhaMoneyPipe implements PipeTransform {
	transform(value: string): number {
		return Number(value) / 100;
	}
}
