<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white  text-black">
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            alt="Quasar logo"
            src="../../public/icons/logo.png"
            style="width: 5rem; height: 5rem"
          />
        </q-toolbar-title>
        <Router-link to="/login">
          Se connecter
        </Router-link>
        <q-btn outline label="S'incrire" color="accent" no-caps class="q-mx-md" to="/register"/>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
