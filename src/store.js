import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchedItems: [],
    totalResults: "",
    currentItemclicked: {},
    showSpinner: false
  },
  mutations: {
    updateSearchedItems(state, { resultsArr, totalResults }) {
      state.searchedItems = resultsArr;
      state.totalResults = totalResults;
    },
    updateCurrentItemClicked(state, item) {
      state.currentItemclicked = { ...item };
    },
    updateSpinner(state, status) {
      state.showSpinner = status;
    }
  },
  actions: {
    fetchSearchResults(context, { searchTerm, pageCount }) {
      fetch(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=${
          process.env.VUE_APP_APIKEY
        }&page=${pageCount}`
      )
        .then(res => res.json())
        .then(data => {
          let objToPass = {
            resultsArr: data.Response === "True" ? data.Search : [],
            totalResults: data.Response === "True" ? data.totalResults : 0
          };
          context.commit("updateSearchedItems", objToPass);
        })
        .catch(err => {
          console.log("error", err);
          alert("Sorry couldn't find any search results");
        });
    },
    fetchMoreInfoOnCurrentItem(context, movieId) {
      context.commit("updateSpinner", true);
      fetch(
        `http://www.omdbapi.com/?i=${movieId}&apikey=${
          process.env.VUE_APP_APIKEY
        }&plot=long`
      )
        .then(res => res.json())
        .then(data => {
          context.commit("updateCurrentItemClicked", data);
          context.commit("updateSpinner", false);
        })
        .catch(err => {
          console.log("erro", err);
          alert(
            "Sorry Couldn't get detailed movie information, please try again later"
          );
        });
    }
  }
});
