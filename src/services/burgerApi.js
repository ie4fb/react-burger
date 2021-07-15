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

export const sendOrderRequest = async data => {
  return fetch('https://norma.nomoreparties.space/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
export const loginRequest = data => {
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

export const registerRequest = data => {
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

export const logoutRequest = data => {
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
  return fetch('https://norma.nomoreparties.space/api/auth/user', {
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('token'),
    },
  }).then(res => {

    if (res.ok) {
      return res.json(res);
    }
    return Promise.reject(res);
  });
};

export const updateUserRequest = data => {
  return fetch('https://norma.nomoreparties.space/api/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('token'),
    },
    body: JSON.stringify(data),
  }).then(res => {

    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
};

export const getToken = data => {
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

export const resetPasswordRequest = data => {
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

export const forgotPasswordRequest = data => {
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
