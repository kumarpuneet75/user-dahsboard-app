import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Modal/UserDashboard';

const intialState: User [] = 
[{name:"Puneet", email:"puneetk1998@gmail.com",role:"Admin"},
  {name:"Ajay", email:"aj@gmail.com",role:"Viewer"},
  {name:"Karanjot", email:"kj@gmail.com",role:"Editor"}
]
@Injectable({providedIn: 'root'})
export class UserManagementService {
  _userState = new BehaviorSubject<User []>(intialState);
  state$=this._userState.asObservable();

  get state(): User[]{
    return this._userState.getValue();

  }
  addState(user: User) {
    // we assaign a new copy of todos by adding a new todo to it 
    // with automatically assigned ID ( don't do this at home, use uuid() )
    this.state = [
      ...this.state, 
      user
    ];
  }

  set state(newUser:User []){
    this._userState.next(newUser);
  }


}
