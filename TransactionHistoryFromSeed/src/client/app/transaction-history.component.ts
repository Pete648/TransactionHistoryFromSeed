import { Component }		from '@angular/core';
import { OnInit }			from '@angular/core';
import { AfterViewInit }	from '@angular/core';
import { ViewChild }		from '@angular/core';

import { Config} from './shared/index';

import { TransactionHistoryService } from './transaction-history.service';
import { Toolbar } from './toolbar';
import { MessageWrapper } from './message-wrapper';

class View {
	showAdvanced: boolean = false;
	showDrafts: boolean = false;
	showFilter: boolean = true;
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

        // jQuery maintains its own object for DOM elements it references.
        // calling $('xxxx') returns that jQuery object
        // somewhere in bootstrap-datepicker a datepicker function 
		// is added to those jQuery objects in our DOM that have the data-provide="datepicker" attribute.
		// calling that function appears to be the only way to set properties on the
		// datepicker

        var fromDate: any = $('#fromDate');         // type ElementFinder

        fromDate.datepicker({ autoclose: true });
        fromDate.datepicker().on('changeDate', (e:any) => toolbar.setFromDate(e.date));
        fromDate.datepicker('update', toolbar.fromDate);

        var toDate: any = $('#toDate');           // type ElementFinder

        toDate.datepicker({ autoclose: true });
        toDate.datepicker().on('changeDate', (e:any) => toolbar.setToDate(e.date));
        toDate.datepicker('update', toolbar.toDate);
	}

	view = new View();
	toolbar = new Toolbar();
	messages: MessageWrapper[] = [];

	onMessageClick(index: any): void {
		this.messages[index].detail = !this.messages[index].detail;

		// we need to change the messages property
		// itself in order for the refresh to occur
		var temp = this.messages;
		this.messages = null;
		this.messages = temp;
	}

	getMessages(): void {

		this.transactionHistoryService.getMessages(this.toolbar)
			.then(
			(messages: any) => {

				let temp: MessageWrapper[] = [];

				this.messages = [];
				for (var i: number = 0; i < messages.$items.length; i++) {
					temp.push(new MessageWrapper(false, messages.$items[i]));
				}

				this.messages = temp;
			});
    }

}
