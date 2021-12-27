import {makeAutoObservable} from "mobx";

class Loader {
    loading = true;

    constructor() {
        makeAutoObservable(this);
    }

    isLoading() {
       return !this.loading;
    }
}