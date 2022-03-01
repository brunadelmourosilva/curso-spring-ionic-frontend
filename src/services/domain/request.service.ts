import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { RequestDTO } from "../../models/request.dto";

@Injectable()
export class RequestService {

    constructor(public http: HttpClient) {
    }

    insert(obj: RequestDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/requests`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}