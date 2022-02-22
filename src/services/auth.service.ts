import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredentialsDTO } from "../models/credentials.dto";
import { LocalUser } from "../models/local_user";
import { StorangeService } from "./storange.service";

@Injectable()
export class AuthService{

    constructor(public http : HttpClient, public storange : StorangeService){  
    }

    authenticate(creds : CredentialsDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        
        let user : LocalUser = {
            token : tok
        };
        
        this.storange.setLocalUser(user);
    }

    logout() {
        this.storange.setLocalUser(null);
    }
}