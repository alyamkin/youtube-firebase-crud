import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js';
import { firebaseConfig } from './config.js';

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

function save() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const username = document.querySelector('#username').value;
  const notes = document.querySelector('#notes').value;
  const favouriteFood = document.querySelector('#favourite_food').value;

  set(ref(database, `users/${username}`), {
    email,
    password,
    username,
    notes,
    favouriteFood,
  });
}
function get() {
  const username = document.querySelector('#username').value;
  onValue(ref(database, `users/${username}`), (snapshot) => {
    const data = snapshot.val();
    fillForm(data);
  });
}
function updateUser() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const username = document.querySelector('#username').value;
  const notes = document.querySelector('#notes').value;
  const favouriteFood = document.querySelector('#favourite_food').value;

  update(ref(database, `users/${username}`), {
    email,
    password,
    username,
    notes,
    favouriteFood,
  });
}
function removeUser() {
  const username = document.querySelector('#username').value;
  remove(ref(database, `users/${username}`));
}

function fillForm(user) {
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const username = document.querySelector('#username');
  const notes = document.querySelector('#notes');
  const favouriteFood = document.querySelector('#favourite_food');

  email.value = user.email;
  password.value = user.password;
  username.value = user.username;
  notes.value = user.notes;
  favouriteFood.value = user.favouriteFood;
}

document.querySelector('#save').addEventListener('click', save);
document.querySelector('#get').addEventListener('click', get);
document.querySelector('#update').addEventListener('click', updateUser);
document.querySelector('#remove').addEventListener('click', removeUser);
