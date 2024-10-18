import googleIcon from "/src/googleIcon.webp";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' }); // Change to lowercase 'select_account'

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google' , {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhoteUrl: resultsFromGoogle.user.photoURL,
                }),
            })
            const data = await res.json();
            if(res.ok){
dispatch(signInSuccess(data));
navigate('/')
            }
        } catch (error) {
            console.error("Error during Google sign-in:", error.code, error.message);
        }
    };

    return (
        <div>
            <span className="text-gray-600">Or continue with</span>
            <button
                className="mt-2 w-full py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition duration-300"
                onClick={handleGoogleClick}
            >
                <img src={googleIcon} alt="Google" className="inline-block h-5 w-5 mr-2" />
                Google
            </button>
        </div>
    );
}
