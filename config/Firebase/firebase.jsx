import firebaseConfig from "./config";

class Firebase {
  constructor(app) {
    if (!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  getUserProfile({ userId, onSnapshot }) {
    //publicProfiles
    return this.db
      .collection("users")
      .where("uid", "==", userId)
      .limit(1)
      .onSnapshot(onSnapshot);
  }


  async register({ fname, lname, email, password }) {
    const response = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (response.user.uid) {
      const { uid } = response.user;
      const userData = { fname, lname, email, uid };
      return this.createNewUser(userData);
    }
  }

  async postComment({ text, bookId }) {
    const postCommentCallable = this.functions.httpsCallable("postComment");
    return postCommentCallable({
      text,
      bookId,
    });
  }


  async passwordReset(email) {
    return await this.auth.sendPasswordResetEmail(email);
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return await this.auth.signOut();
  }

  async signupWithEmail(email, password, fname, lname) {
    const response = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const userObject = {
      address1: "",
      address2: "",
      avatar: "",
      city: "",
      country: "UK",
      email: email,
      fname: fname,
      idVerif: false,
      lname: lname,
      phone: 44,
      postcode: "",
      prefcontact: "email",
      uid: response.user.uid,
    }
    if (response.user.uid) {
      //const userId = response.user.uid;
      const { uid } = response.user;
      const userData = { email, uid, fname, lname };
      console.log("firebase user data", userData);
      console.log("firebase user", response.user);
      //await this.createNewUser(userData);
      await this.createNewUser(userObject);
      return response;
    }
    return response;
  }

  createNewUser(userData) {
    return this.db
      .collection("users")
      .doc(`${userData.uid}`)
      .set(userData);
  }


  updateAvatar(docId, avatarURL) {
    return this.db
      .collection("users")
      .doc(`${docId}`)
      .update({ avatar: avatarURL });
  }

  updateProfile(values) {
    const uid = this.loginStatus2();
    //console.log({...values});
    return this.db.collection("users").doc(`${uid}`).update(values);
    // .update({ address1: values.address });
  }


  async uploadImage(uri) {
    //res = await this.auth.signInWithEmailAndPassword('quantomatic@protonmail.ch', 'admin-//1173f9')
    //console.log(res.user.uid);
    const uid = this.loginStatus2();
    const response = await fetch(uri);
    const blob = await response.blob();
    const avatarReference = this.storage
      .ref()
      .child("images")
      .child("avatars")
      .child(uid);

    avatarReference.put(blob).then((uploadTaskSnapshot) => {
      avatarReference.getDownloadURL().then((value) => {
        console.log(value);
        this.updateAvatar(uid, value);
      });
    });
  }


  loginStatus2() {
    const user = this.auth.currentUser;
    if (user) {
      // User is signed in.
      //console.log("login status2", user.uid);
      return user.uid;
    } else {
      // No user is signed in.
      return null;
    }
  }

  getUser() {
    return this.auth.currentUser;
  }

  async getUserProfile2() {
    const uid = this.loginStatus2();
    const docRef = this.db.collection("users").doc(uid);
    const doc = await docRef.get();
    if (!doc.exists) {
      //console.log('No such document!');
      return null;
    } else {
      //console.log('Document data:', doc.data());
      return doc.data();
    }
  }


  async getCollection(name) {
    //return this.db.collection(name).get();
    const query = this.db.collection(name);
    const querySnapshot = await query.get();
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return results;
  }

  async getAccountBalance() {
    const uid = this.loginStatus2();
    const docRef = this.db.collection("transactions").doc(uid);
    const doc = await docRef.get();
    if (!doc.exists) {
      //console.log('No such document!');
      return null;
    } else {
      //console.log('Document data:', doc.data());
      return doc.data().amount;
    }
  }

  subscribeBalance({ onSnapshot }) {
    const uid = this.loginStatus2();
    return this.db
      .collection("transactions")
      .doc(uid)
      .collection("transactions")
      .orderBy("date", "desc")
      .onSnapshot(onSnapshot);
  }


  async recordTransaction(order, uid, newOrder) {
    const tr = {
      amount: Number((-(order.price + 0.05) * order.shares).toFixed(2)),
      type: "debit",
      date: order.date,
      reference: newOrder.id,
      vendorName: "alphaseeker.app",
    };
    return this.db
      .collection("transactions")
      .doc(uid)
      .collection("transactions")
      .add(tr);
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if (!firebaseInstance && app) {
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  } else if (firebaseInstance) {
    return firebaseInstance
  } else {
    return null;
  }
}

export default getFirebaseInstance;
