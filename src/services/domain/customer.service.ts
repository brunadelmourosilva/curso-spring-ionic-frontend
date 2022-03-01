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

    findByEmail(email: string) {

        return this.http.get(
            `${API_CONFIG.baseUrl}/customers/email?value=${email}`);
    }

    findById(id: string) {

        return this.http.get(
            `${API_CONFIG.baseUrl}/customers/${id}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : CustomerDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/customers`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}