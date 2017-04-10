<template>
  <div>
    <section class="hero is-dark is-large">
      <div class="hero-head">
        <Top :index="2"></Top>
      </div>
    </section>
    <div class="container section">
      <div class="columns">
        <div class="column is-4">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                三消小游戏-宠物小精灵版
              </p>
            </header>
            <div class="card-image">
              <figure class="image is-square">
                <img src="../../assets/img/eliminate.png" alt="Image">
              </figure>
            </div>
            <div class="card-content has-text-right">
              <p><a class="button is-info" href="eliminate.html">Play</a></p>
            </div>
          </div>
        </div>
        <div class="column is-4"></div>
        <div class="column is-4"></div>
      </div>
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
  import Top from '../../components/Top'
  import Bottom from '../../components/Bottom'
  export default {
    name: 'game',
    components: {Top, Bottom},
    computed: {}
  }
</script>
