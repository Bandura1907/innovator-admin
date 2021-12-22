import {makeAutoObservable} from "mobx";
import UserService from "../services/user.service";

class User {

    users = [];

    constructor() {
        makeAutoObservable(this);
    }

    // async fetchUsers() {
    //    const response = await UserService.getAllUsers();
    //    this.users = response.data;
    // }
}

export default new User();