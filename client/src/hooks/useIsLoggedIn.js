import { jwtDecode } from "jwt-decode";

export const useIsLoggedIn = () => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp && decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                return false;
            }

            return true;
        } catch (error) {
            localStorage.removeItem('token');
            return false;
        }
    }
    return false;
};
