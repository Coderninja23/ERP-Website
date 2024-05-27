import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/functions";
// const firebaseConfig = {
//   type: "service_account",
//   project_id: "gc-webathon-2024",
//   private_key_id: "4b35703aa680b0c593490ae28c126410cf6daad1",
//   private_key:
//     "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCOyOzlsQyryYgT\nYywZaTDy81aA7vl1kyrKHOYExe1YSyXDvjA7lrJx2s+51T7rL8MMdRVEn2jQYazU\nh9vsffEjCjGj9dO3JAc/snxX4iRnuL/8xdKQcubyo6wDPi2BJvFHT3pHJ6aQfUgq\nCzElBK1fZ78rCtmr/2J594D46BL3WEeltnqifVAMHLEMVqvSPS9WfMXwYwCqcRH8\niU+MleJLVqogVQPHWJVOgejwfreqpm/InUzbBUZz75FjxAR8hNEUuc8lN/WW2kVR\nU66xhX2LwObgLb96n2w5WHEqTBbsbsXkitA9aytQgwWJTou3GWyaN5QRN/oHrgq7\nkCJifo75AgMBAAECggEARFTUxlGWKkoelISj8J8+PS6GCdsTyBg/ZI0y6TrdjKEd\n+BC3HXVPfZxFR/5NB5mKYxZPMNGHBB6Sav1/mqxk76truTcmdGFKFMoypo5DdN3e\nBzaWv+k1LA52/fBOL5423rUi5BWOKVzDYdeMU9ZqsBtCyfL928my04LGlpfdp7/B\nP67/vs4DUt8/QysSaJB8nxotHSU0Cd33enPpPSCeFNyaM3+ElCHHL93vCnJExk7B\nFM+TDTP52EW51IUKnwW8YcqN1+kRSOH0h7XkQcXalWYUKMfPXXGBbBCt/CyKIbKw\npyzhctD+xPhGbVG5Wqp/pc0ECwyRuN4/+kquyfuLPwKBgQC/PohtSMNygxUld1V8\niAB49vhVMqUI2bhXkgFp5IEJ2Zqb9UetpK7CC5E+p+N8iOGfXRVozHwtfSB2Hf6d\np2BdztkPoHy8Jsxi25Q7dU+Qy/T5jUFINY01BPXvqD8cDtAAKW8VWixdm2MKuSpK\n1Fr/RtpkmsCAWVbexRoy3kFsYwKBgQC/IdOQm1lo54IV5/S2RyPxNOY2HdSuryM2\nISgBEteUy3t1PMuWjCJov+7uccAR6VFWkFAuCLUXm2w29hlyw/MVzCYwMSEQgQBc\nPKHmCpx3LkCYXgEcg70akg0R80IeUzqb+S/ULVf4seFJGPC/Yfi/o/po8hOUAEQr\nyGc+Io+v8wKBgQCeQggxr2oVpAXmyDbU49LIR0+/aTaK+WiEBw3mbDKgTROVhcd4\nGXSInXvnRpWI49k  ZwLTL0ZPdLNOlCzM9kVm8p0SWmu894Dl4gU7MWUqrfyxNKqhg\nMfiVbHJ8jVUUSem0iJUlLUbTe5fdMtedrtdSsnZdlHZCgCvUE3WXrLalEwKBgHDl\nkyksifCMJuu3mnV8qf9VBtJaZoFUVBEqHo4byhlK5D7IzVy8o6qKDKDtsc0iqvfd\nwG6gmA88r/v6++ctVU2/y6LVsjkkackRy3OtOuSu/lrB1Bg6vJ2QPYYn0RtGgC0X\nUKgcrITq1S6vO61gOmVAf64zp1rZmWrfMhSip4r/AoGAOQQ/3Fo7yY3UkCMjZ2f7\nt6Xaa3vPBzhIl8KORpop8X4+sC6mXkUjC0sADJrwf2rlzClPS3UkAh0244LWDjOE\nVL7ddTNh3esVTouHd4G+vjUlGx+kEMU4nCYw6gmuLjkvcsTRbaPEI1NJzDeIs5/+\n3AY3XPHg3DNvOiFD4hyOjd0=\n-----END PRIVATE KEY-----\n",
//   client_email:
//     "firebase-adminsdk-adxdq@gc-webathon-2024.iam.gserviceaccount.com",
//   client_id: "115296025887407890531",
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url:
//     "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-adxdq%40gc-webathon-2024.iam.gserviceaccount.com",
//   universe_domain: "googleapis.com",
// };
// console.log(firebaseConfig);
const firebaseConfig = {
  apiKey: "AIzaSyAozq_b2zAhVe-Rb7ivr--k_yWzDDH4s0Y",
  authDomain: "gc-webathon-2024.firebaseapp.com",
  projectId: "gc-webathon-2024",
  storageBucket: "gc-webathon-2024.appspot.com",
  messagingSenderId: "115296025887407890531",
  appId: "1:115296025887407890531:web:4d9f3e1d7d7d1b8c7e3d1d",
  measurementId: "G-7ZL2ZJ8Z4T",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export { firebaseApp };
