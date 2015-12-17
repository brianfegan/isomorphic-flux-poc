import Fluxxor from 'fluxxor';
import {serialize,hydrate} from './isomorphic';

let flux;

export function makeFlux(stores, actions) {
    flux = new Fluxxor.Flux(stores, actions);
    flux.serialize = serialize;
    flux.hydrate = hydrate;
    return flux;
}

export function getFlux() {
    return flux;
}