
import {GoogleAuthProvider, signInWithPopup, type User, signOut} from "@firebase/auth";
import {auth, db} from "~/firebase/client";
import {collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where, updateDoc} from "@firebase/firestore";


interface login {
    user:User,
    accessToken: string,
}

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
})

export const loginWithGoogle = async (): Promise<User> => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user, 'Successfully logged in');
        return user;

    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw new Error(`Google Sign In Error: ${errorMessage} (code: ${errorCode})`);

    }
}

export const logOutUser = async () => {
    try {
        await signOut(auth);
        console.log('User signed out successfully');
    } catch (e) {
        console.error('Error signing out: ', e)
    }
}

export const storeUserData = async (user:User, imageUrl:string | null) => {
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
    } catch (e) {
        console.log(e)
    }
}


export const storeAdminData = async (user:User, imageUrl:string | null) => {
    try {
        const adminData = {
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

        await setDoc(doc(db, 'admins', user.uid), adminData, {merge: true});
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
        const user = await loginWithGoogle();

        const userDocRef = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
            // If user exists, just update their last login time and profile info
            await updateDoc(userDocRef, {
                lastUpdated: serverTimestamp(),
                imageUrl: user.photoURL || null,
                name: user.displayName,
            });
            console.log('Returning user data updated.');

        } else {
            // If new user, create the full document
            await storeUserData(user, user.photoURL || null);
            console.log('New user data stored successfully');
        }

    } catch (error) {
        console.error('An error occurred during Google Sign-In and data storage:', error);
        throw error;
    }
}


export const handleAdminGoogleSignIn = async () => {
    try {
        const user = await loginWithGoogle();

        const userDocRef = doc(db, 'admins', user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
            await updateDoc(userDocRef, {
                lastUpdated: serverTimestamp(),
                imageUrl: user.photoURL || null,
            });
            console.log('Returning admin data updated.');
            return await getAdminData(user.uid);
        } else {
            await storeAdminData(user, user.photoURL || null);
            console.log('New user data stored successfully');
        }
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        throw error;
    }
}

export const getAdminById = async (userId:string) => {
    try {
        const userDocRef = await doc(db, 'admins', userId);
        const userSnapshot = await getDoc(userDocRef)

        if(!userSnapshot.exists()) {
            throw new Error('Admin not found');
        }

        return userSnapshot;
    } catch (error) {
        console.error(error)
        throw error;
    }
}
export const getUserById = async (userId:string) => {
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

export const getAdminData = async (userId:string) => {
    try {
        const userSnapshot = await getAdminById(userId);
        if(userSnapshot.exists()) {
            const userData = userSnapshot.data()
            const dateJoined = userData.dateJoined?.toDate ? userData.dateJoined.toDate().toISOString() : userData.dateJoined;

            return {
                id: userSnapshot.id,
                ...userData,
                dateJoined: dateJoined,
            };
        }

        return null;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getUserData = async (userId:string) => {
    try {
        const userSnapshot = await getUserById(userId);
        if(userSnapshot.exists()) {
            const userData = userSnapshot.data()
            const dateJoined = userData.dateJoined?.toDate ? userData.dateJoined.toDate().toISOString() : userData.dateJoined;

            return {
                id: userSnapshot.id,
                ...userData,
                dateJoined: dateJoined,
            };
        }

        return null;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchUserProfile = async (userId:string) => {
    return await getUserData(userId);
}

export const getAllUsers = async () => {
    try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const allUsers = usersSnapshot.docs.map(doc => doc.data());

        const adminsCollection = collection(db, 'admins');
        const adminsSnapshot = await getDocs(adminsCollection);
        const allAdmins = adminsSnapshot.docs.map(doc => doc.data());

        return {allAdmins, allUsers}
    } catch (e) {
         console.log(e)
    }
}
