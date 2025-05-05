// Firebase app konfigürasyonu için gerekli importlar
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase yapılandırma bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyCVhEDgC0crDe5jKoqYadqWLK7CL1ud8Pg",
  authDomain: "hsdfirat.firebaseapp.com",
  projectId: "hsdfirat",
  storageBucket: "hsdfirat.appspot.com",
  messagingSenderId: "1021497705752",
  appId: "1:1021497705752:web:b1c035b63ac95ffdcc8a6d"
};

// Firebase'i başlat veya mevcut olanı al
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// LOCAL tipinde kalıcı oturum desteğini etkinleştirin
// Bu, oturum bilgilerinin cihaz belleğinde saklanmasını sağlar
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase; 