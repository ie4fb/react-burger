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
            .catch(err => console.log(err))
    };