<template>
  <div id="app">
    <section class="hero is-primary is-large header-image">
      <div class="hero-head">
        <header class="nav">
          <div class="container">
            <div class="nav-left">
              <a class="nav-item" href="../index.html">
                xxweimei blog
              </a>
            </div>
            <div class="nav-right nav-menu">
              <a class="nav-item is-active">Home</a>
              <a class="nav-item">Blog</a>
              <a class="nav-item">Game</a>
              <a class="nav-item">Github</a>
              <a class="nav-item">About</a>
              <a class="nav-item">Donate</a>
            </div>
          </div>
        </header>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-2">
            Welcome to a fantastic place
          </h1>
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
              <p><i class="fa fa-linux"></i></p>
              <br>
              <p>DevOps</p>
              <br>
              <p>shell python</p>
              <p>gitlab docker rancher</p>
              <p>and so on</p>
              <br>
              <p><a class="button is-info">More</a></p>
            </div>
          </div>
          <div class="column is-4">
            <div class="panel section has-text-centered">
              <p><i class="fa fa-github"></i></p>
              <br>
              <p>前端</p>
              <br>
              <p>HTML5 CSS3 JavaScript Android</p>
              <p>JQuery Vue Angular Bootstrap Bulma</p>
              <p>and so on</p>
              <br>
              <p><a class="button is-info">More</a></p>
            </div>
          </div>
          <div class="column is-4">
            <div class="panel section has-text-centered">
              <p><i class="fa fa-chrome"></i></p>
              <br>
              <p>后端</p>
              <br>
              <p>Java Scala</p>
              <p>springmvc springboot maven gradle</p>
              <p>and so on</p>
              <br>
              <p><a class="button is-info">More</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>Copyright © 2017 xxweimei</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {},
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
    background-image: linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.60)), url('assets/images/background.jpg')
  }
  .section.main {
    background-color:#F0F0F0;
  }
</style>
