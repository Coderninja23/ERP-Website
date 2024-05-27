import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase";
import { useNavigate } from "react-router";
export default function AuthWrapper(Component) {
  const IsAuth = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const firebaseAuth = getAuth(firebaseApp);

      const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
        console.log("User in", firebaseApp);
        if (user) {
          setIsLoggedIn(true);
        } else {
          alert("You are not logged in. Please login to continue");
          console.log("props", props);
          navigate("/");
        }
      });

      return () => unsubscribe();
    }, []);

    if (!isLoggedIn) {
      return null;
    }

    return <Component {...props} />;
  };

  IsAuth.getInitialProps = async (ctx) => {
    const componentProps =
      Component.getInitialProps && (await Component.getInitialProps(ctx));

    return { ...componentProps };
  };

  return IsAuth;
}
