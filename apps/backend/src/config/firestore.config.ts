import { Firestore } from '@google-cloud/firestore';

const firestore = new Firestore({
  projectId: process.env.FIRESTORE_PROJECT_ID ?? '',
  keyFilename: process.env.FIRESTORE_KEY_FILENAME ?? '',
});

export default firestore;
