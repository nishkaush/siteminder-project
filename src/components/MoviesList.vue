<template>
  <div>
    <!-- only shows up if there are any movies to show -->
    <div v-if="searchedItems.length">
      <template v-for="item in searchedItems">
        <div
          @click="showItem(item)"
          class="px-3 py-3 individual-movie-entry-div"
          :class="{'selected-movie':currentItemclicked.imdbID===item.imdbID}"
          :key="item.imdbID"
        >
          <span>{{item.Title}}</span>
          <span>{{item.Year}}</span>
          <div class="hidden-md-and-up">
            <v-img width="100" contain :src="item.Poster"></v-img>
          </div>
        </div>
        <v-divider :key="item.imdbID.toString()+'yoyo'"></v-divider>
      </template>
    </div>

    <!-- If no movies found for a specific searched word -->
    <div v-else>
      <p class="caption">No search results found</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["searchedItems", "currentItemclicked"],
  methods: {
    showItem(item) {
      // tells parent component to update the current item to be viewed in Preview
      this.$emit("update:currentItemclicked", item);
    }
  }
};
</script>


<style scoped>
.selected-movie {
  background: white;
  font-weight: bold;
}

.individual-movie-entry-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
</style>
