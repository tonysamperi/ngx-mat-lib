import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

/**
 * HOW TO
 * Extend this class to create your custom can navigates
 */
@Injectable()
export class XmatRouteInterceptorService implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        /*if (!!route.data && !!route.data.checkParams) {
            if(!!route.params){
                return true;
            }
            else{
                this.router.navigate(["myState"]);
                return false;
            }
        }*/

        return true;
    }
}
