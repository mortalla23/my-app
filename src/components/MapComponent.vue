<template>
  <div id="map" style="height: 500px;">
    <l-map :zoom="zoom" :center="center" style="height: 100%;">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="userPosition"></l-marker>
      <l-marker :lat-lng="otherUserPosition"></l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';
import socketService from '../socketService'; // Import du service Socket.io

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 13,
      center: [48.8584, 2.2945], // Coordonnées par défaut (exemple : Paris)
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // URL pour les tuiles OpenStreetMap
      userPosition: [48.8584, 2.2945], // Position initiale de l'utilisateur
      otherUserPosition: [48.8566, 2.3522], // Position de l'autre utilisateur
    };
  },
  mounted() {
    socketService.connect(); // Connexion Socket.io

    // Obtenir la position de l'utilisateur via l'API de géolocalisation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPosition = [position.coords.latitude, position.coords.longitude];
        socketService.sendPosition(this.userPosition); // Envoie la position au serveur
        this.center = this.userPosition; // Centre la carte sur l'utilisateur
      });
    }

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
</style>
