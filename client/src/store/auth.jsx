import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initialize token from localStorage
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [userData, setUserData] = useState("");
    const AuthorizationToken = `Bearer ${token}`;

    // Fetch user data if token exists
    const userAuthentication = async () => {
        if (!token) return;

        console.log("Checking if we have token or not: " + token);

        try {
            const response = await fetch("https://d1a64x3q3ktxtv.cloudfront.net/api/auth/user", {
                method: 'GET',
                headers: {
                    Authorization: AuthorizationToken
                }
            });

            if (response.ok) {
                console.log("Response of fetching user is OK");
                const data = await response.json();
                console.log("Fetched user: ", data);
                setUserData(data.userData);
            } else {
                console.error("Error fetching user data");
            }
        } catch (error) {
            console.log("Error while fetching user:", error);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [token]);

    // Store token in localStorage
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken); // Persist token
    };

    // Check if user is logged in
    let isLoggedIn = !!token;

    // Logout Function
    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, userData, AuthorizationToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use Auth Context
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of a provider");
    }
    return authContextValue;
};
