<template>
    <div id="map" style="height: 500px;">
      <!-- Leaflet Map -->
      <l-map :zoom="zoom" :center="center" style="height: 100%;">
        <l-tile-layer :url="url"></l-tile-layer>
        <!-- Marqueur pour l'utilisateur -->
        <l-marker :lat-lng="userPosition"></l-marker>
        <!-- Marqueur pour l'autre utilisateur -->
        <l-marker :lat-lng="otherUserPosition"></l-marker>
      </l-map>
    </div>
  </template>
  
  <script>
  import { LMap, LTileLayer, LMarker } from 'vue3-leaflet'
  import 'leaflet/dist/leaflet.css'
  
  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker
    },
    data() {
      return {
        zoom: 13,
        center: [48.8584, 2.2945], // Coordonnées de départ (exemple Paris)
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        userPosition: [48.8584, 2.2945], // Position initiale de l'utilisateur
        otherUserPosition: [48.8566, 2.3522], // Position de l'autre utilisateur
      }
    },
    mounted() {
      // Une fois monté, tu pourras mettre à jour les positions si nécessaire
    }
  }
  </script>
  
  <style>
  #map {
    height: 500px;
    width: 100%;
  }
  </style>
  