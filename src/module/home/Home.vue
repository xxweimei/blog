<template>
  <div>
    <section class="hero is-primary is-large header-image">
      <div class="hero-head">
        <Top></Top>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-2">
            Welcome to a fantastic place
          </h1>
          <br>
          <h2 class="subtitle is-5">
            {{welcomeMsg}}
          </h2>
        </div>
      </div>
    </section>
    <div class="section main">
      <div class="container">
        <div class="columns">
          <div class="column is-4">
            <div class="panel section has-text-centered">
              <p class="icon is-large"><i class="fa fa-bookmark-o"></i></p>
              <p class="title is-2">Latest</p>
              <p>rancher and gitlab devops</p>
              <br>
              <p><a class="button is-info">More</a></p>
            </div>
          </div>
          <div class="column is-4">
            <div class="panel section has-text-centered">
              <p class="icon is-large"><i class="fa fa-fire"></i></p>
              <p class="title is-2">Hottest</p>
              <p>rancher and gitlab devops</p>
              <br>
              <p><a class="button is-info">More</a></p>
            </div>
          </div>
          <div class="column is-4">
            <div class="panel section has-text-centered">
              <p class="icon is-large"><i class="fa fa-thumbs-o-up"></i></p>
              <p class="title is-2">Recommend</p>
              <p>rancher and gitlab devops</p>
              <br>
              <p><a class="button is-info">More</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
  import Top from '../../components/Top'
  import Bottom from '../../components/Bottom'
  export default {
    name: 'home',
    components: {Top, Bottom},
    computed: {
      welcomeMsg(){
        let hour = new Date().getHours()
        if (hour < 12) {
          return 'Good morning.'
        } else if (hour >= 12 && hour < 18) {
          return 'Good afternoon.'
        } else {
          return 'Good evening.'
        }
      }
    }
  }
</script>

<style>
  .header-image {
    background-image: linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.60)), url('../../assets/img/background.jpg')
  }

  .section.main {
    background-color: #F0F0F0;
  }
</style>
