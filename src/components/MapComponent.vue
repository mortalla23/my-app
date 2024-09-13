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
import socketService from './socketService'; // Importer le service

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 13,
      center: [48.8584, 2.2945],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      userPosition: [48.8584, 2.2945],
      otherUserPosition: [48.8566, 2.3522],
    };
  },
  mounted() {
    const socket = socketService.connect();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPosition = [position.coords.latitude, position.coords.longitude];
        socketService.sendPosition(this.userPosition); // Utiliser le service pour envoyer la position
        this.center = this.userPosition;
      });
    }

    socketService.onOtherUserPosition((position) => {
      this.otherUserPosition = position;
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
