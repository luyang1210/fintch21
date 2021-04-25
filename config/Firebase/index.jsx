import getFirebaseInstance from "./firebase";
import useAuth from './useAuth';
import FirebaseContext from "./context";
import {withFirebaseHOC} from './context';

export { withFirebaseHOC };
export { FirebaseContext, useAuth };
export default getFirebaseInstance;