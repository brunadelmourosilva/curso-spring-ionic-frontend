import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorangeService } from '../services/storange.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storange: StorangeService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log("Passou no interceptor");

        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            switch(errorObj.status) {
                case 403:
                this.handle403();
                break;
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            return Observable.throw(errorObj);
        }) as any;
    }

    handle403() {
        this.storange.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};