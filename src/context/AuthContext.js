import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) setUserToken(token);
        };
        loadToken();
    }, []);

    const login = async (token, user) => {
        await AsyncStorage.setItem('userToken', token);
        setUserToken(token);
        setUserInfo(user);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('userToken');
        setUserToken(null);
        setUserInfo(null);
    }

    return (
        <AuthContext.Provider value={{ userToken, userInfo, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);