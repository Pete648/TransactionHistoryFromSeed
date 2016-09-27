
export class Toolbar {
	fromDate: String = "12/01/2001";
    toDate: String = "12/31/2003";

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