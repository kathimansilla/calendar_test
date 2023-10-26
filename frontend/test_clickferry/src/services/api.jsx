const callToApi = () => {
    return fetch('http://localhost:5173/available-days')
      .then((response) => response.json());
  };
  
  export default callToApi;