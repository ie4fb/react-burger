import { getCookie } from './utils';

export const getBurgerIngredients = async () => {
  return fetch('https://norma.nomoreparties.space/api/ingredients', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then(resJSON => {
      return resJSON;
    });
};

export const sendOrderRequest = async (data: string[]) => {
  return fetch('https://norma.nomoreparties.space/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       authorization: getCookie('token')!,
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then(resJSON => {
      if (resJSON.success) {
        return resJSON;
      }
      return Promise.reject(resJSON.success);
    });
};
export const loginRequest = (data: { email: string; password: string }) => {
  return fetch('https://norma.nomoreparties.space/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
};

export const registerRequest = (data: {
  email: string;
  password: string;
  name: string;
}) => {
  return fetch('https://norma.nomoreparties.space/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
};

export const logoutRequest = (data: { token: string }) => {
  return fetch('https://norma.nomoreparties.space/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
};

export const getUserRequest = () => {
  const requestHeaders: HeadersInit = new Headers();
  const cookie = getCookie('token');
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.append('authorization', `${cookie}`);
  return fetch('https://norma.nomoreparties.space/api/auth/user', {
    method: 'GET',
    headers: requestHeaders,
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
};
export const getOrders = () => {
  return fetch('https://norma.nomoreparties.space/api/orders/all', {
    method: 'GET',
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
};

export const updateUserRequest = (data: {
  name?: string;
  email?: string;
  password?: string;
}) => {
  const requestHeaders: HeadersInit = new Headers();
  const cookie = getCookie('token');
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.append('authorization', `${cookie}`);
  return fetch('https://norma.nomoreparties.space/api/auth/user', {
    method: 'PATCH',
    headers: requestHeaders,
    body: JSON.stringify(data),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
};

export const getToken = (data: { token: string }) => {
  return fetch('https://norma.nomoreparties.space/api/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
};

export const resetPasswordRequest = (data: {
  password: string;
  token: string;
}) => {
  return fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
};

export const forgotPasswordRequest = (data: { email: string }) => {
  return fetch('https://norma.nomoreparties.space/api/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
};
