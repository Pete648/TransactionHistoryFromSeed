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
		this.addColumn(this.boolToString(this.symMessage.Voided), ClassName.RightBold);

		this.addRow();

		this.addColumn("Post Date:", ClassName.Left);
		this.addColumn(this.symMessage.PostDate, ClassName.RightBold, DataType.Date);

		this.addColumn("User Override:", ClassName.Left);
		this.addColumn(this.symMessage.Override, ClassName.RightBold);

		this.addColumn("RegE:", ClassName.Left);
		this.addColumn(this.boolToString(this.symMessage.RegE), ClassName.RightBold);

		this.addRow();

		this.addColumn("Post Time:", ClassName.Left);
		this.addColumn(this.symMessage.Time, ClassName.RightBold);

		this.addColumn("Secuirity Level:", ClassName.Left);
		this.addColumn(this.symMessage.Security, ClassName.RightBold);

		this.addColumn("RegD Trn:", ClassName.Left);
		this.addColumn(this.boolToString(this.symMessage.RegDTrn), ClassName.RightBold);
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

	private boolToString(value: string): string {
		return (value == null || value === "0") ? "No" : "Yes";
	}

	detailRows: DetailRow[] = [];
}

//{
//	"$tag": "AcctMgr",
//	"Action": "AddSLTranHist",
//	"AcctNum": "0000119540",
//	"ID": "00",
//	"IDType": "0",
//	"CmtFlag": "0",
//	"XferFlag": "0",
//	"Adjustment": "0",
//	"RegE": "0",
//	"RegDChk": "0",
//	"RegDTrn": "0",
//	"Recurring": "0",
//	"Voided": "1",
//	"SubAction": "",
//	"EffDate": "05062003",
//	"Sequence": "7082",
//	"PostDate": "05062003",
//	"Time": "1429",
//	"UserNum": "0",
//	"ProcUser": "0",
//	"Override": "-1",
//	"Security": "1",
//	"Console": "2101",
//	"Desc": "",
//	"Tran": "Cash Deposit",
//	"ActionCode": "D",
//	"SourceCode": "C",
//	"BalChg": "500",
//	"IntPen": "0",
//	"PrevAvail": "0",
//	"NewBal": "720580",
//	"Fee": "0",
//	"Escrow": "0",
//	"SalesTax": "0",
//	"BilledFee": "0",
//	"FeeExmtCrtsy": "0",
//	"UnapPmtChg": "0",
//	"EscUnpdChg": "0",
//	"EscAppldChg": "0",
//	"LastTranDate": "05062003",
//	"DueMatureDate": "00000000",
//	"ActiveDate": "12312001",
//	"TranAmount": "500",
//	"MemberBranch": "",
//	"SubSource": "0",
//	"StmtDescr1": "Deposit",
//	"BatchSeq": "0",
//	"Branch": "0",
//	"CnfrmNum": "",
//	"CnfrmSeq": "0",
//	"ImgName1": "INSTITUTION",
//	"ImgValue1": "0",
//	"ImgName2": "NUMBER",
//	"ImgValue2": "0000119540",
//	"ImgName3": "ID",
//	"ImgValue3": "0000",
//	"ImgName4": "POSTDATE",
//	"ImgValue4": "05062003",
//	"ImgName5": "SEQUENCENUMBER", "ImgValue5": "7082", "ImgName6": "MICRACCTNUM", "ImgValue6": "",
//	"ImgName7": "TRANAMOUNT", "ImgValue7": "500", "SearchContext1": "QRY_AMTH_SHARE_RECEIPT", "SynergyOnly": "0"
//}
