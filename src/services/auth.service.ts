import { http } from "../utils/http-common";
import Cookies from "js-cookie";

class AuthService {
  signup(data: any) {
    return http.post('/signup',data);
  }
  login(data: any) {
    return http.post('/login',data);
  }
  getDecToken() {
    if (typeof window !== "undefined") {
      return Cookies.get('LOCAL_STORAGE_TOKEN_KEY');
    }
    return;
  }
  setToken(token: string) {
    Cookies.set('LOCAL_STORAGE_TOKEN_KEY', token);
  }
  isLoggedIn() {
    const token = this.getDecToken();
    if (token) {
      try {
        return http.get('/check');
      } catch (error: any) {
        console.log(error);
        return ;
      }
    } else {
      console.log('No token');
      window.location.pathname = '/auth/login'
      return;
    }
  }
  logout() {
    this.removeToken();
    return (window.location.href = '/auth/login');
  }
  removeToken() {
    Cookies.remove('LOCAL_STORAGE_TOKEN_KEY');
  }
  
}

const authService = new AuthService();
export default authService;
