<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white  text-black">
      <q-toolbar>
        <q-toolbar-title>
          <!-- <q-img
            alt="Quasar logo"
            src="../../public/icons/logo.png"
            style="width: 5rem; height: 5rem"
          /> -->
          Lewis App
        </q-toolbar-title>
        <h6 class="text-negative">Tableau de bord</h6>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
