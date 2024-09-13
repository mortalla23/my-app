<template>
    <div class="home">
      <h1>Bienvenue !</h1>
      <form @submit.prevent="goToMap">
        <div>
          <label for="name">Nom :</label>
          <input type="text" v-model="name" required />
        </div>
        <div>
          <label for="latitude">Latitude :</label>
          <input type="number" v-model="latitude" required />
        </div>
        <div>
          <label for="longitude">Longitude :</label>
          <input type="number" v-model="longitude" required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        latitude: '',
        longitude: ''
      };
    },
    methods: {
      goToMap() {
        // Redirection vers la carte avec les informations de l'utilisateur
        this.$router.push({
          name: 'MapComponent',
          params: {
            name: this.name,
            latitude: this.latitude || 48.8584, // Assurer une valeur par défaut
            longitude: this.longitude || 2.2945, // Assurer une valeur par défaut
          },
        });
      },
    },
  };
  </script>
  
  <style>
  .home {
    text-align: center;
    margin-top: 50px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    margin: 10px;
    padding: 5px;
  }
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  