//import { Pipe, PipeTransform } from '@angular/core';
//import { DecimalPipe } from '@angular/common';
//import { JhaDateStringPipe } from './jha.pipe';
//import { JhaMoneyPipe } from './jha.pipe';

enum DataType {
	Text = 0,
	Date = 1,
	Money = 2
}

enum ClassName {
	Left,
	LeftBold,
	RightBold
}
class DetailColumn {
    constructor(public value: any, public className: string, public dataType: DataType) {
		// format is undefined if not specified
    }
}

class DetailRow {
    detailColumns: DetailColumn[] = [];
}

export class MessageWrapper {
	constructor(public showDetail: boolean, public symMessage: any) {

		//let date = new JhaDateStringPipe();	// make static
		//let money = new JhaMoneyPipe();
		//let decimal = new DecimalPipe();

		this.addRow();

		this.addColumn(this.symMessage.Tran, ClassName.LeftBold);

		this.addRow();

		this.addColumn(this.symMessage.IDType == "0" ? "Share ID:" : "Loan ID", ClassName.Left);
		this.addColumn(this.symMessage.ID, ClassName.RightBold);

		this.addColumn("Sequence:", ClassName.Left);
		this.addColumn(this.symMessage.Sequence, ClassName.RightBold);

		this.addColumn("Branch:", ClassName.Left);
		this.addColumn(this.symMessage["Branch"], ClassName.RightBold);

		this.addRow();

		this.addColumn("Effective Date:", ClassName.Left);
		this.addColumn(this.symMessage.EffDate, ClassName.RightBold, DataType.Date);

		this.addColumn("User Number:", ClassName.Left);
		this.addColumn(this.symMessage.UserNum, ClassName.RightBold);

		this.addColumn("Void:", ClassName.Left);
		this.addColumn(this.symMessage.Voided == "1" ? "Yes" : "No", ClassName.RightBold);

		this.addRow();

		this.addColumn("Post Date:", ClassName.Left);
		this.addColumn(this.symMessage.PostDate, ClassName.RightBold, DataType.Date);

		this.addColumn("User Override:", ClassName.Left);
		this.addColumn(this.symMessage.Override, ClassName.RightBold);

		this.addColumn("Trans Amt:", ClassName.Left);
		this.addColumn(this.symMessage.TranAmount, ClassName.RightBold, DataType.Money);
	}

	addRow(): void { this.detailRows.push(new DetailRow()); }

	addColumn(value: string, className: ClassName, dataType?: DataType): void {

		if (dataType == null) {
			dataType = DataType.Text;
		}

		let classNameString: string = "jha-left";

		if (className === ClassName.LeftBold) {
			classNameString = "jha-left-bold";
			
		}
		else if (className === ClassName.RightBold) {
			classNameString = "jha-right-bold";
		}

		this.detailRows[this.detailRows.length - 1].detailColumns.push(new DetailColumn(value, classNameString, dataType));
	}

	detailRows: DetailRow[] = [];
}

