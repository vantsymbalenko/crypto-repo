import { FIREBASE_COLLECTION_USER } from "../../../constants/appConst";
import { firebaseFirestore, fire } from "../../../FirebaseConfig/Fire";

export const setSecretCode = (data) => {
  const uid = fire.auth().currentUser.uid;
  return firebaseFirestore
    .collection(FIREBASE_COLLECTION_USER)
    .doc(uid)
    .update({
        ...data
    });
};