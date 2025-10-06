//
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "~/firebase/client";
// import { redirect } from "react-router-dom";
//
// /**
//  * A client-side loader that checks the user's authentication status.
//  * - If the user is authenticated, it redirects them to the home page ('/').
//  * - If the user is not authenticated, it redirects them to the sign-in page.
//  */
// export const authRedirectLoader = () => {
//     return new Promise((resolve) => {
//         // onAuthStateChanged is the recommended way to get the current user
//         // as it waits for the auth state to be initialized.
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             unsubscribe(); // Unsubscribe to prevent memory leaks after the check is done.
//
//             if (user) {
//                 // User is authenticated.
//                 return resolve(redirect('/'));
//             } else {
//                 // User is not authenticated.
//                 return resolve(redirect('/sign-in'));
//             }
//         });
//     });
// };
