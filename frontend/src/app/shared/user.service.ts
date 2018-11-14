import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootURL ="http://localhost:8080/"
  constructor(private http: HttpClient) { }


  getalluser(){
     
    return this.http.get(this.rootURL+'allusers');
   }

   deleteUser(id) {
    return this.http.get(this.rootURL+`delete/${id}`);
  }

  addUser(name, email, phone) {
    const data = {
      name: name,
      email: email,
      phone: phone
    };
    return this.http.post(this.rootURL+`adduser`, data);
  }

  getUserById(id) {
    return this.http.get(this.rootURL+`singleuser/${id}`);
  }

  updateUser(id, name, email, phone) {
    const userdata = {
      name: name,
      email: email,
      phone: phone
    };
    return this.http.put(this.rootURL+`user/update/${id}`, userdata);
  }
}
