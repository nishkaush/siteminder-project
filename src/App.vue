<template>
  <v-app>
    <v-container fluid>
      <v-layout>
        <!-- Left Pane starts here -->
        <v-flex xs12 sm10 md4 class="mx-auto px-3">
          <!-- Search field in top left corner -->
          <!-- caters for search icon click or "Enter" key on keyboard to find movies -->
          <v-text-field
            clearable
            append-icon="search"
            @click:append="searchMovies"
            label="Type a movie name to search"
            v-model="searchTerm"
            @keyup.enter="searchMovies"
          ></v-text-field>

          <!-- spinner while search results are retrieved  -->
          <v-progress-circular v-if="showSpinner" :size="50" color="primary" indeterminate></v-progress-circular>

          <!-- list of movies showing year of release and title -->
          <MoviesList v-else :searchedItems="searchedItems"/>
          <!-- :currentItemclicked.sync="currentItemclicked" -->

          <!-- Pagination component, only shows up if total Results > 10 -->
          <v-pagination
            v-if="totalResults && totalResults>10"
            v-model="pageCount"
            :length="numberOfPages"
          ></v-pagination>
        </v-flex>

        <!-- Right Pane Component starts here -->
        <!-- this shows the movie Preview -->
        <SingleMoviePreview></SingleMoviePreview>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import SingleMoviePreview from "./components/SingleMoviePreview.vue";
import MoviesList from "./components/MoviesList.vue";
import SampleData from "./sample-data.js";
export default {
  name: "App",
  components: {
    SingleMoviePreview: SingleMoviePreview,
    MoviesList: MoviesList
  },
  data() {
    return {
      showSpinner: false,
      searchTerm: "",
      pageCount: 1
    };
  },
  computed: {
    numberOfPages() {
      return this.totalResults ? Math.floor(this.totalResults / 10) : 0;
    },
    totalResults() {
      return this.$store.state.totalResults;
    },
    searchedItems() {
      return this.$store.state.searchedItems;
    }
  },
  methods: {
    searchMovies() {
      if (this.searchTerm) {
        let objToPass = {
          searchTerm: this.searchTerm,
          pageCount: this.pageCount
        };
        this.$store.dispatch("fetchSearchResults", objToPass);
      }
    }
  },
  mounted() {
    // Fills the searchedItems Array with some starting dummy data
    this.$store.commit("updateSearchedItems", {
      resultsArr: SampleData,
      totalResults: SampleData.length
    });
  },
  watch: {
    // whenever pageCount changes, try and fetch the next 10 movies
    pageCount() {
      this.searchMovies();
    }
  }
};
</script>


<style scoped>
</style>
