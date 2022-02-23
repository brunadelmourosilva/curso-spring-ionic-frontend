import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { CustomerDTO } from "../../models/customer.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorangeService } from "../storange.service";


@Injectable()
export class CustomerService {

    constructor(public http: HttpClient, 
                public storange: StorangeService) {
    }

    findByEmail(email: string) : Observable<CustomerDTO> {
        let token = this.storange.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<CustomerDTO>(
            `${API_CONFIG.baseUrl}/customers/email?value=${email}`,
            {'headers': authHeader});
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
}