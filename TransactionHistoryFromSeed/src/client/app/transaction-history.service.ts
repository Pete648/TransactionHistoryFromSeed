import { Injectable } from '@angular/core';

import { EpisysServerService } from './episys-server.service';
import { MockEpisysServerService } from './mock-episys-server.service';

@Injectable()
export class TransactionHistoryService {

    constructor(private episysService: MockEpisysServerService) { }
//    constructor(private episysService: EpisysServerService) { }

    // return the result of .then which is a promise
    getMessages(): Promise<Object> { return this.episysService.receiveMessages("serviceName", "methodName", "args").then((messages) => this.getFilteredMessages(messages)); }

    getFilteredMessages(messages:any) {
        return {
            $items: messages.$items.filter((message:any) => message.Action == "AddSLTranHist")
        };
    }
}