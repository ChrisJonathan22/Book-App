import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    let usernameSearch = (<HTMLInputElement>document.getElementById('usernameSearch'));
    let searchButton = (<HTMLInputElement>document.getElementById('searchButton'));
    let deleteButton = (<HTMLInputElement>document.getElementById('deleteButton'));
    // This is where the data will be displayed
    let content = (<HTMLInputElement>document.getElementById('content-holder'));
    let found = (<HTMLInputElement>document.getElementById('found'));
    let notFound = (<HTMLInputElement>document.getElementById('notFound'));
    


    // Initiate the button click event
    searchButton.addEventListener('click',() => {

      // Save the values of the text and file input field into the object below
      let user = {
        username: usernameSearch.value,
      };

      // Reset the text and file input fields
      usernameSearch.value = "";
      

      let url = "http://localhost:3000/users";
      
      fetch(url, {method: "POST",
                //Set content type as JSON
                headers: {'Content-Type':'application/json'},
                // Stringify the JSON object which holds the value
                body: JSON.stringify(user)})
      .then((response)=> {
      // The returned promise
        return response.json();
      })
      .then((result) => {
      // If there is a match do this
      console.log(`username = ${result.username}`);
      let userFound = document.createElement("p");
      userFound.innerHTML = `<b>Username:</b> ${result.username} <br/> <b>Book names:</b> ${result.bookNames} <br/> <b>Wishlist:</b> ${result.wishlist}`;
      found.appendChild(userFound);
      notFound.innerHTML = "";
      }).catch(() => {
          // If there is an error assume the user isn't found and display a message as well as delete any previous users found.
          console.log("error");
          let userNotFound = document.createElement("p");
          userNotFound.innerHTML = "The user does not exist...try again";
          notFound.appendChild(userNotFound);
          found.innerHTML = "";
      });
    },false);

    deleteButton.addEventListener('click', () => {

      // Save the values of the text and file input field into the object below
      let user = {
        username: usernameSearch.value,
      };

      // Reset the text and file input fields
      usernameSearch.value = "";
      

      let url = "http://localhost:3000/delete";
      
      fetch(url, {method: "DELETE",
                //Set content type as JSON
                headers: {'Content-Type':'application/json'},
                // Stringify the JSON object which holds the value
                body: JSON.stringify(user)})
      .then((response)=> {
      // The returned promise
        return response.json();
      })
      .then((result) => {
      // If there is a match do this
      console.log(`username = ${result.username}`);
      let userFound = document.createElement("p");
      userFound.innerHTML = `<b>Username:</b> ${result.username} <br/> <b>Book names:</b> ${result.bookNames} <br/> <b>Wishlist:</b> ${result.wishlist}`;
      found.appendChild(userFound);
      notFound.innerHTML = "";
      }).catch(() => {
          // If there is an error assume the user isn't found and display a message as well as delete any previous users found.
          console.log("error");
          let userNotFound = document.createElement("p");
          userNotFound.innerHTML = "The user does not exist...try again";
          notFound.appendChild(userNotFound);
          found.innerHTML = "";
      });
    }, false);


  }
}


