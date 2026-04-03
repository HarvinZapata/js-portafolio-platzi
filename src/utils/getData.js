const API = process.env.API; //variable de entorno para la url de la api, process.env -> para acceder a las variables de entorno, API -> nombre de la variable de entorno

const getData = async (id) => {
  const apiURl = id ? `${API}${id}` : API;
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.log('Fetch Error', error);
  };
};

export default getData;