

/*
	The module is called 'eventsFirebase' within the app
*/


/* Firebase CDN */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";

/* Firebase Storage */
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

/* Firebase Database */
import { 
	getDatabase, 
	ref as dbRef, 
	set,
	push,
	child
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";


let firebaseStorage = {};
let firebaseStorageRef = {};
let firebaseDatabaseRef = {};


/* Initialize firebase */
function initializeFirebase() {

	const firebaseConfig = {
		apiKey: "AIzaSyBF5bmDGpP8oMN3ElJ0b7elFV4RYLuMKDM",
		authDomain: "vcf-405.firebaseapp.com",
		projectId: "vcf-405",
		storageBucket: "vcf-405.appspot.com",
		messagingSenderId: "1047272732317",
		appId: "1:1047272732317:web:02bc4f6eb4118d62ce0674"
	};

	/* Initialize Firebase */
	const app = initializeApp(firebaseConfig);

	/* Initialize Firebase's storage instance */
	firebaseStorage = getStorage(app);

	/* Initialize Firebase's storage instance */
	firebaseDatabaseRef = getDatabase();
}

function uploadFileToFirebase(file) {
	firebaseStorageRef = ref(firebaseStorage, file.name);
	const uploadTask = uploadBytesResumable(firebaseStorageRef, file);

	uploadTask.on('state_changed', 
		(snapshot) => {
			// Observe state change events such as progress, pause, and resume
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
				case 'paused':
				console.log('Upload is paused');
				break;
			
				case 'running':
				console.log('Upload is running');
				break;
			}
		}, 
		(error) => {
			// Handle unsuccessful uploads
		}, 
		() => {

			// Handle successful uploads on complete
			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				console.log('File available at', downloadURL);
				let documentUrl = document.getElementById("certificate-url");
				documentUrl.value = downloadURL;
			});
		}
	);
}


/* Firebase Database */
function captureRegistrationData(regId, regData) {

	let jsonRegData = {};
	let jsonKey = {};

	regData.forEach(function(value, key) {
		jsonKey = key.replaceAll("/", "-");
		jsonRegData[jsonKey] = value;
	});

	let registrationRef = dbRef(firebaseDatabaseRef, 'registrations');
	let newRegRef = push(registrationRef);
	set(newRegRef, {
		"regData": jsonRegData
	});
}
/* end Firebase Database */


export default {
	"initializeFirebase": initializeFirebase,
	"uploadFileToFirebase": uploadFileToFirebase,
	"captureRegistrationData": captureRegistrationData
}