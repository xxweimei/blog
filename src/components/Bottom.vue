<template>
  <div>
    <header class="nav">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item" href="home.html">
            xxweimei blog
          </a>
        </div>
        <div class="nav-right nav-menu">
          <a class="nav-item" v-bind:class="{'is-active':index===0}" href="home.html">Home</a>
          <a class="nav-item" v-bind:class="{'is-active':index===1}" href="">Blog</a>
          <a class="nav-item" v-bind:class="{'is-active':index===2}" href="game.html">Game</a>
          <a class="nav-item" v-bind:class="{'is-active':index===3}" href="">Github</a>
          <a class="nav-item" v-bind:class="{'is-active':index===4}" href="">About</a>
          <a class="nav-item" v-bind:class="{'is-active':index===5}" href="">Donate</a>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  export default {
    name: 'top',
    props: {
      index: {
        type: Number,
        default: 0
      }
    },
  }
</script>
