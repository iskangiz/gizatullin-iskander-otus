<template>
  <v-app>
    <v-app-bar
            app
            color="primary"
            dark>
      <div class="d-flex align-center">
        <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                transition="scale-transition"
                width="40" />

        <v-img
                alt="Vuetify Name"
                class="shrink mt-1 hidden-sm-and-down"
                contain
                min-width="100"
                src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                width="100" />
      </div>

      <v-spacer></v-spacer>

      <template v-slot:extension>
        <v-tabs fixed-tabs>
          <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.url">{{tab.title}}</v-tab>
        </v-tabs>
      </template>
      <login v-model="showLogin"></login>
      <v-btn text @click.stop="showLogin = true">Login</v-btn>
      <v-btn text>Logout</v-btn>
    </v-app-bar>

    <v-content >
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import Login from  "./components/Login"
export default {
  name: 'App',

  components: {
    Login: Login
  },

  data: () => ({
    tabs: [
      {id: 1, title: "Home", url: "/"},
      {id: 2, title: "Settings", url: "/Settings"}
    ],
    showLogin: false
  })
};
</script>
