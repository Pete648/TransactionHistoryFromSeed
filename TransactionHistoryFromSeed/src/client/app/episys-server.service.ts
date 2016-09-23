
import { Injectable }		from '@angular/core';
import { Headers, Http }	from '@angular/http';

import 'rxjs/add/operator/toPromise';

class Request {
	constructor(serviceName: String, methodName: String, args: String)
	{
		this.RequestId = (new Date()).getTime().toString();
		this.ServiceName = serviceName;
		this.MethodName = methodName;
		this.Arguments = args;
	}

	RequestId: String;
	ServiceName: String;
	MethodName: String;
	Arguments: String;
}

@Injectable()
export class EpisysServerService {

	private questUrl = 'http://localhost:7895';

	constructor(private http: Http) { }

	receiveMessages(serviceName: String, methodName: String, args: String): Promise<Object> {

		var request = new Request(serviceName, methodName, args);

		return this.http.post(this.questUrl, JSON.stringify(request))
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
