<template>
  <h1>Bienvenue, {{ name }} !</h1>
  <div id="map" style="height: 500px;">
    <l-map :zoom="zoom" :center="center" style="height: 100%;" :zoomControl="true">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="userPosition"></l-marker>
      <l-marker :lat-lng="otherUserPosition"></l-marker>
    </l-map>
    <!-- <div class="zoom-buttons">
      <button @click="zoomIn">Zoom In</button>
      <button @click="zoomOut">Zoom Out</button>
    </div> -->
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';
import socketService from '../socketService'; // Import du service Socket.io

export default {
  props: ['name', 'latitude', 'longitude'], 
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 13,
      center: [this.latitude || 48.8584, this.longitude || 2.2945], // Utiliser une valeur par défaut si undefined
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // URL pour les tuiles OpenStreetMap
      userPosition: [this.latitude || 48.8584, this.longitude || 2.2945],
      otherUserPosition: [48.8566, 2.3522], // Position de l'autre utilisateur
    };
  },
  methods: {
    zoomIn() {
      const map = this.$refs.mapRef.mapObject;
      map.setZoom(map.getZoom() + 1); // Incrémente le zoom
    },
    zoomOut() {
      const map = this.$refs.mapRef.mapObject;
      map.setZoom(map.getZoom() - 1); // Décrémente le zoom
    }
  },
  mounted() {
    socketService.connect(); // Connexion Socket.io
    socketService.sendPosition(this.userPosition);
    // // Obtenir la position de l'utilisateur via l'API de géolocalisation
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.userPosition = [position.coords.latitude, position.coords.longitude];
    //     socketService.sendPosition(this.userPosition); // Envoie la position au serveur
    //     this.center = this.userPosition; // Centre la carte sur l'utilisateur
    //   });
    // }

    // Écoute la position de l'autre utilisateur via Socket.io
    socketService.onOtherUserPosition((position) => {
      this.otherUserPosition = position; // Met à jour la position de l'autre utilisateur
    });
  }
};
</script>

<style>
#map {
  height: 500px;
  width: 100%;
}
.zoom-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.zoom-buttons button {
  margin: 5px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.zoom-buttons button:hover {
  background-color: #0056b3;
}
</style>
