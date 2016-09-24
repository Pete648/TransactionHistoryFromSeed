import { Component }		from '@angular/core';
import { OnInit }			from '@angular/core';
import { AfterViewInit }	from '@angular/core';
import { ViewChild }		from '@angular/core';

import { Config} from './shared/index';

import { TransactionHistoryService } from './transaction-history.service';

class View {
	showAdvanced: boolean = false;
	showDrafts: boolean = false;
	showFilter: boolean = true;
}

class Toolbar {
    fromDate: String = this.getFormatedDate(new Date());
    toDate: String = this.fromDate;

    searchAmountType: number = 0;

	setFromDate(date: Date): void {
		this.fromDate = this.getFormatedDate(date);
	}

	setToDate(date: Date): void {
		this.toDate = this.getFormatedDate(date);
	}

    getFormatedDate(date: Date /*, datePicker: Boolean*/): String {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

		return [this.pad(month, 2), this.pad(day, 2), year].join("/");
    }

    pad(num: number, size: number): String {
        let s = "000000000" + num;
        return s.substr(s.length - size);
    }
}

@Component({
  moduleId: module.id,
  selector: 'transaction-history',
	templateUrl: 'transaction-history.component.html',
	styleUrls: ['transaction-history.component.css'],
	providers: [TransactionHistoryService]      // only used in this component
})

export class TransactionHistoryComponent implements OnInit, AfterViewInit {
	constructor(private transactionHistoryService: TransactionHistoryService) {
		console.log('Environment config', Config);
	}

	ngOnInit(): void { this.getMessages(); }
	ngAfterViewInit(): void {

		var toolbar = this.toolbar;

		$('#fromDate').datepicker({ autoclose: true });
		$('#fromDate').datepicker().on('changeDate', e => toolbar.setFromDate(e.date));
		$('#fromDate').datepicker('update', toolbar.fromDate);

		$('#toDate').datepicker({ autoclose: true });
		$('#toDate').datepicker().on('changeDate', e => toolbar.setToDate(e.date));
		$('#toDate').datepicker('update', toolbar.toDate);
	}

	view = new View();
	toolbar = new Toolbar();
	messages = {};

	getMessages(): void {

        this.transactionHistoryService.getMessages().then(
			messages => this.messages = messages);
    }

}