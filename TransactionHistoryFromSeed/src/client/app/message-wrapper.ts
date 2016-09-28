
class DetailColumn {
    constructor(public description: string, public value: any) {
    }
}

class DetailRow {
    detailColumns: DetailColumn[] = [];
}

export class MessageWrapper {
	constructor(public showDetail: boolean, public symMessage: any) {

        let detailRow = new DetailRow();
        detailRow.detailColumns.push(new DetailColumn("Post Date", this.symMessage.PostDate));
        detailRow.detailColumns.push(new DetailColumn("Eff Date", this.symMessage.EffDate));
        detailRow.detailColumns.push(new DetailColumn("Fees", this.symMessage.Fee));

        this.detailRows.push(detailRow);
    }

    detailRows: DetailRow[] = [];
}

