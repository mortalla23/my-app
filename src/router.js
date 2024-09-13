import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import MapComponent from './components/MapComponent.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/map',
    name: 'MapComponent',
    component: MapComponent,
    props: true, // Permet de passer des propriétés comme le nom et les coordonnées
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
