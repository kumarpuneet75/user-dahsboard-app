import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { User, Users } from '../Modal/UserDashboard';

const intialState: Users = {
  "user":[]
}
@Injectable({providedIn: 'root'})
export class UserManagementService {
  _userState = new BehaviorSubject<User []>([]);
  state$=this._userState.asObservable();

  get state(): User[]{
    return this._userState.getValue();

  }
  addState(title: User) {
    // we assaign a new copy of todos by adding a new todo to it 
    // with automatically assigned ID ( don't do this at home, use uuid() )
    this.state = [
      ...this.state, 
      title
    ];
  }

  set state(newUser:User []){
    this._userState.next(newUser);
  }


}
