import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref, set, push } from "firebase/database";

import { app } from "./firebaseConfig";

let auth = getAuth(app);
let db = getDatabase(app);

export let fbAuth = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        resolve(uid);
      } else {
        reject("No user found");
      }
    });
  });
};

export let fbGet = (nodeName, id) => {
  return new Promise((resolve, reject) => {
    const reference = ref(db, `${nodeName}/${id ? id : ""}`);
    onValue(reference, (data) => {
      if (data.exists()) {
        resolve(Object.values(data.val()));
      } else {
        reject(" No Data found :( ");
      }
    });
  });
};

export let fbAdd = (nodeName, body, id) => {
  return new Promise((resolve, reject) => {
    const TaskId = push(ref(db, `${nodeName}/${id}`)).key;
    body.id = TaskId;

    const referece = ref(db, `${nodeName}/${body.id}`);
    set(referece, body)
      .then((res) => {
        resolve("Data Send Successfully", res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
