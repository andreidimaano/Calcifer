import firebase from "firebase";

export let updateDatabase = async (userDatabase: firebase.firestore.Firestore, authorTag: string, userDB: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>, time: Number) => {
    try {
        let minutesStudied = userDB.data()!.minutesStudied;
        await userDatabase.collection('Guild').doc(authorTag).update({
            'minutesStudied': (minutesStudied + time)
        })
    } catch(error) {
        console.log(error);
    }
}

export let addUser = async (userDatabase: firebase.firestore.Firestore, user: string, time: Number) => {
    try {
        await userDatabase.collection('Guild').doc(user).set({
            'minutesStudied': time
        })
    } catch(error) {
        console.log(error);
    }
}