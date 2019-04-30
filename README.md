# Siteminder Project

## Project setup

```
npm install
```

### Compiles and hot-reloads for local development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

## Project Structure & Components Overview

App.vue --> contains the left and right panes, where

    Left Pane - contains the search box, movies list and pagination components

    Right Pane - Movie preview including text and Poster

Movies List --> holds the list of all movies retrieved for a given search term (shows some dummy data upon initial load)

Single Movie Preview --> Uses the Id of a given movie, to fetch further details from OMDB like duration, Actors,etc.
