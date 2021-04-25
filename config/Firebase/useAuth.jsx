import { useEffect, useState } from "react"
import getFirebaseInstance from "./firebase"
import loadFirebaseDependencies from "./loadFirebaseDependencies"
import NetInfo from "@react-native-community/netinfo";

function useAuth() {
    const [user, setUser] = useState(null)
    const [firebase, setFirebase] = useState(null)
    const [loading, setLoading] = useState(true)
    const [netInfo, setNetInfo] = useState(false)

    // It calls when connection changes
    const onChange = (newState) => {
      setNetInfo(newState)
    }
  
    // useEffect hook calls only once like componentDidMount()
    useEffect(() => {
      // To get current network connection status
      NetInfo.fetch().then((connectionInfo) => {
        setNetInfo(connectionInfo.isConnected)
      })
      // Whenever connection status changes below event fires
      const unsubscribe = NetInfo.addEventListener(state => {
        //setNetInfo(state.isConnected)
        onChange(state.isConnected)
      });
  
      // Our event cleanup function
      return () => {
        unsubscribe();
      }
    }, [])

    useEffect(() => {
        let unsubscribe
        let publicProfileUnsubscribe;

        netInfo ? loadFirebaseDependencies.then(app => {
            const firebaseInstance = getFirebaseInstance(app)
            setFirebase(firebaseInstance)

            unsubscribe = firebaseInstance.auth.onAuthStateChanged(userResult => {
                if (userResult) {
                    publicProfileUnsubscribe = firebaseInstance.getUserProfile({
                        userId: userResult.uid,
                        onSnapshot: r => {
                            firebaseInstance.auth.currentUser.getIdTokenResult(true).then(token => {
                                setUser({
                                    ...userResult,
                                    isAdmin: token.claims.admin,
                                    username: r.empty ? null : r.docs[0].id
                                });
                            })

                        }
                    })
                }else{
                    if(publicProfileUnsubscribe){
                        publicProfileUnsubscribe();
                    }
                    setUser(null);
                }

                setLoading(false);
            })
        })  : null;

        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [netInfo])

    return { user, firebase, loading }
}

export default useAuth
