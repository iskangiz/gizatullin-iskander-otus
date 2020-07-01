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
          <v-tab v-for="(tab, index) in allTabs" :key="index" :to="tab.url">{{tab.title}}</v-tab>
        </v-tabs>
      </template>
      <login v-model="showLogin"></login>
      <template v-if="!getIsLoggedIn">
        <v-btn text @click.stop="showLogin = true">Login</v-btn>
      </template>
      <template v-else>
        <v-btn text @click="logoutBtn()">Logout</v-btn>
      </template>
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
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'App',

  components: {
    Login: Login
  },

  data: () => ({
    tabs: [
      {title: "Home", url: "/"}
    ],
    showLogin: false
  }),

  computed: {
    ...mapGetters([
      'getIsLoggedIn',
      'getIsAdmin'
    ]),
    allTabs: function () {
      // `this` указывает на экземпляр vm
      if (this.getIsLoggedIn) {
        let securedTabs = [
          {title: "Vocabulary", url: "/Vocabulary"},
          {title: "Training", url: "/VocabularyTraining"},
          {title: "Exercises", url: "/Exercises"}
        ];
        if (this.getIsAdmin) {
          securedTabs.push({title: "Exercise Assistance", url: "/ExerciseAssistance"});
        }
        return this.$data.tabs.concat(securedTabs);
      } else
        return this.$data.tabs;
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    logoutBtn() {
      this.logout();
      this.$router.push('/home')
    }
  }
};
</script>
