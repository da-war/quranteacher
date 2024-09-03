import firestore,{FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export const addDocument = async (collectionName:FirebaseFirestoreTypes.CollectionReference, data) => {
  try {
    const docRef = await firestore().collection(collectionName).add(data);
    console.log('Document added with ID: ', docRef.id);
    return docRef;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};


export const setDocument = async (collectionName, docId, data, merge = true) => {
    try {
      await firestore().collection(collectionName).doc(docId).set(data, { merge });
      console.log(`Document set with ID: ${docId}`);
    } catch (error) {
      console.error('Error setting document: ', error);
      throw error;
    }
  };
  

  export const updateDocument = async (collectionName, docId, data) => {
    try {
      await firestore().collection(collectionName).doc(docId).update(data);
      console.log(`Document updated with ID: ${docId}`);
    } catch (error) {
      console.error('Error updating document: ', error);
      throw error;
    }
  };

  
  export const getDocument = async (collectionName, docId) => {
    try {
      const documentSnapshot = await firestore().collection(collectionName).doc(docId).get();
  
      if (documentSnapshot.exists) {
        return documentSnapshot.data();
      } else {
        console.log('No document found with ID:', docId);
        return undefined;
      }
    } catch (error) {
      console.error('Error getting document: ', error);
      throw error;
    }
  };
  