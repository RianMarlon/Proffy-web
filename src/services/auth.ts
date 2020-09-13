import api from './api';

export const TOKEN_KEY = '@proffy/user';

export const hasToken = () => {

  const tokenLocalStorage = localStorage.getItem(TOKEN_KEY);
  const tokenSessionStorage = sessionStorage.getItem(TOKEN_KEY);
  
  const hasTokenInLocalStorage = tokenLocalStorage !== null;
  const hasTokenInSessionStorage = tokenSessionStorage !== null;

  if (hasTokenInLocalStorage || hasTokenInSessionStorage) {
    return true;
  }

  else {
    return false;
  }
};

export const hasTokenValid = async () => {

  if(hasToken()) {
    const tokenLocalStorage = localStorage.getItem(TOKEN_KEY);
    const tokenSessionStorage = sessionStorage.getItem(TOKEN_KEY);

    const hasTokenInLocalStorage = tokenLocalStorage !== null;
    const hasTokenInSessionStorage = tokenSessionStorage !== null;

    if (hasTokenInLocalStorage) {
      const response = await api.post('/validate-token');
      const { isTokenValid } = response.data;

      if (!isTokenValid) {
        localStorage.removeItem(TOKEN_KEY);
      }
      return isTokenValid;
    }

    if (hasTokenInSessionStorage) {
      const data = {
        token: tokenSessionStorage
      }

      const response = await api.post('/validate-token', data);
      const { isTokenValid } = response.data;
      
      if (!isTokenValid) {
        sessionStorage.removeItem(TOKEN_KEY);
      }

      return isTokenValid;
    }
  }

  else {
    return false;
  }
};

export const getToken = () => {
  const tokenLocalStorage = localStorage.getItem(TOKEN_KEY);
  const tokenSessionStorage = sessionStorage.getItem(TOKEN_KEY);
  
  const hasTokenInLocalStorage = tokenLocalStorage !== null;
  const hasTokenInSessionStorage = tokenSessionStorage !== null;

  if (hasTokenInLocalStorage) {
    return tokenLocalStorage;
  }

  if (hasTokenInSessionStorage) {
    return tokenSessionStorage;
  }
};

export const removeToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
};
