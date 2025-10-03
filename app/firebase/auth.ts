import {GoogleAuthProvider, signInWithPopup, type User} from "@firebase/auth";
import {auth, db} from "~/firebase/client";
import {collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where} from "@firebase/firestore";


interface login {
    user:User,
    accessToken: string,
}
/**
 * @param accessToken
 * @param user
 * @returns
 */

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select account',
})

export const loginWithGoogle = async ():Promise<{user:User, accessToken:string |undefined}> => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const accessToken = credential?.accessToken;
        if(!accessToken) {
            throw new Error('No accessToken');
        }
        const user = result?.user;
        console.log(user, 'Successfully logged in');

        return {user, accessToken}

    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(error)

        throw new Error(`Google Sign In Error: ${errorMessage} (code: ${errorCode})`);

    }
}

export const logOutUser = async () => {
    try {

    } catch (e) {
        console.log(e)
    }
}

export const getUserPicture = async (accessToken: string|undefined) => {
    const endpoint = `https://people.googleapis.com/v1/users/me`;
    try {
        const response = await fetch(`${endpoint}?personFields=photos`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const personData = await response?.json();

        if (personData?.photos && personData.photos.length > 0) {
            const primaryPhoto =  personData.photos[0]
            return primaryPhoto.url
        }

        return null
    } catch (e) {
        console.log('Error getting Google picture',e)
    }
}

export const storeUserData = async (user:User, imageUrl:string) => {
    try {
        const userData = {
            accountId: user.uid,
            email: user.email,
            name: user.displayName,
            imageUrl: imageUrl,
            dateJoined: serverTimestamp(),
            lastUpdated: serverTimestamp(),
            emailVerified: user.emailVerified,
            providerData: user.providerData.map(profile => ({
                providerId: profile.providerId,
                uid: profile.uid,
                displayName: profile.displayName,
                email: profile.email,
                photoURL: profile.photoURL,
            }))
        };

        await setDoc(doc(db, 'users', user.uid), userData, {merge: true});
        // await db.collection('users').doc(user.uid).set(userData);
    } catch (e) {
        console.log(e)
    }
}

export const getExistingUserByEmail = async (email: string) => {
    try {
        const usersRef = collection(db,'users')
        const q = query(usersRef, where('email', '==', email.toLowerCase().trim()));
        const querySnapshot = await getDocs(q);

        return querySnapshot.empty ? null : querySnapshot.docs[0];
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const handleGoogleSignIn = async () => {
    try {
        const {user, accessToken} = await loginWithGoogle();

        let profileImageUrl = null;
        try {
            profileImageUrl =  await getUserPicture(accessToken);

        } catch(imageError) {
            console.warn('Could not fetch Google People Api image, using default:',imageError);
            profileImageUrl = user.photoURL;
        }

        await storeUserData(user, profileImageUrl);
        console.log('Successfully logged in');
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getUserById = async (userId:string) => {
    try {
        const userDocRef = await doc(db, 'users', userId);
        const userSnapshot = await getDoc(userDocRef)

        if(!userSnapshot.exists()) {
            throw new Error('User not found');
        }

        return userSnapshot;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

const getUserData = async (userId:string) => {
    try {
        const userSnapshot = await getUserById(userId);
        if(userSnapshot.exists()) {
           const userData = userSnapshot.data()
           return {
               id:userSnapshot.id,
               ...userData,
               dateJoined: userData.dateJoined?.toISOString() || userData.dateJoined
           } ;
        }

        return null;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const fetchUserProfile = async (userId:string) => {
    return await getUserData(userId);
}