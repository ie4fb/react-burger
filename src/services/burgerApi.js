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
    })
    .catch(err => console.log(err));
};

export const sendOrderRequest = async (data) => {
  return fetch('https://norma.nomoreparties.space/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: data
    })
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status)
    })
    .then(resJSON => {
      if(resJSON.success) {
        return resJSON
      }
      return Promise.reject(resJSON.success)
    })
    .catch(err => console.log(err))
};
