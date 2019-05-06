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
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=6bfd9a64&page=${pageCount}`
      )
        .then(res => res.json())
        .then(data => {
          console.log("finaldata", data);

          if (data.Response === "True") {
            let objToPass = {
              resultsArr: data.Search,
              totalResults: data.totalResults
            };
            context.commit("updateSearchedItems", objToPass);
            // this.searchedItems = data.Search;
            // this.totalResults = data.totalResults;
          } else {
            context.commit("updateSearchedItems", {
              resultsArr: [],
              totalResults: 0
            });
          }
        })
        .catch(err => {
          console.log("error", err);
          alert("Sorry couldn't find any search results");
        });
    },
    fetchMoreInfoOnCurrentItem(context, movieId) {
      context.commit("updateSpinner", true);
      fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=6bfd9a64&plot=long`)
        .then(res => res.json())
        .then(data => {
          // this.currentItem = data;
          // this.showSpinner = false;
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
