<template>
  <q-layout view="lHh Lpr lFf">
	<q-header elevated>
  	<q-toolbar class="constrain">
    	<q-btn flat round dense class="q-mr-sm" to="/" icon="eva-play-circle-outline" size="18px"/>  	 
    	<q-separator class="large-screen-only" vertical spaced />
    	<q-toolbar-title align="center">
      	My favorite movies
    	</q-toolbar-title>
    	<q-separator class="large-screen-only" vertical spaced />
    	<q-btn flat round dense to="/movie-list" icon="eva-home-outline" size="18px"/>
    	<q-btn flat round dense to="/movie-create" icon="eva-plus-outline" size="18px"/>
  	</q-toolbar>
	</q-header>
	<q-footer class="bg-white" bordered>
  	<q-tabs class="text-grey-10  small-screen-only" active-color="primary" indicator-color="transparent"
  	>
    	<q-route-tab to="/movie-list" name="home" icon="eva-home-outline"  />
    	<q-route-tab to="/movie-create" name="movie" icon="eva-plus-outline"  />
  	</q-tabs>
	</q-footer>
	<q-page-container>
  	<router-view />
	</q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
	return {
  }
  }
  }
</script>
