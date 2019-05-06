<template>
  <v-flex md8 class="hidden-sm-and-down pa-2">
    <!-- spinner while a movie preview is fetched -->
    <v-progress-circular :size="50" color="primary" indeterminate v-if="showSpinner"></v-progress-circular>

    <transition name="slideInRight">
      <v-layout
        justify-space-around
        v-if="Object.keys(currentItem).length && !showSpinner"
        class="right-pane px-4 py-3"
      >
        <!-- this v-flex shows text info -->
        <v-flex md8>
          <p class="title">{{currentItem.Title}}</p>
          <p class="caption">{{currentItem.Genre}}</p>
          <p class="subheading">{{currentItem.Plot}}</p>
          <p class="caption">
            <b>Language/s</b>
            : {{currentItem.Language}}
          </p>
          <p class="caption">
            <b>Director</b>
            : {{currentItem.Director}}
          </p>
          <p class="caption">
            <b>Actors</b>
            : {{currentItem.Actors}}
          </p>
          <p class="caption">
            <b>Duration</b>
            : {{currentItem.Runtime}}
          </p>
        </v-flex>
        <!-- this flex shows the movie poster, if any -->
        <v-flex md4 class="pa-2">
          <v-img v-if="currentItem.Poster!=='N/A'" contain :src="currentItem.Poster"></v-img>
          <p v-else class="body-2 pa-2 unavailable-poster">Poster Unavailable</p>
        </v-flex>
      </v-layout>
    </transition>

    <!-- This is the default markup for when no movie has been selected for previewing -->
    <v-layout v-if="!Object.keys(currentItem).length && !showSpinner">
      <v-flex>
        <p class="title">Movie Preview</p>
        <p class="subheading">Click on the searched movies on the left to see their preview</p>
        <p class="caption">Search steps as follows:</p>
        <p class="caption">(1) Type name of a movie in the search box</p>
        <p class="caption">(2) Hit the search button or press "Enter" to start searching</p>
        <p class="caption">(3) Click on any of the movie results to preview</p>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  computed: {
    showSpinner() {
      return this.$store.state.showSpinner;
    },
    currentItem() {
      return this.$store.state.currentItemclicked;
    },
    movieId() {
      return this.currentItem.imdbID || "";
    }
  },
  watch: {
    movieId(val) {
      if (val) {
        this.$store.dispatch("fetchMoreInfoOnCurrentItem", val);
      }
    }
  }
};
</script>


<style scoped>
.right-pane {
  box-shadow: 0px 10px 20px 0px grey;
  background: white;
}

.unavailable-poster {
  height: 300px;
  width: 200px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

@-webkit-keyframes slideInRight {
  from {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideInRight {
  from {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.slideInRight-enter-active {
  -webkit-animation: slideInRight 0.5;
  animation: slideInRight 0.5s;
}
</style>

