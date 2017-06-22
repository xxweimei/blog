<template>
  <div>
    <section class="hero is-dark is-large">
      <div class="hero-head">
        <Top :index="2"></Top>
      </div>
    </section>
    <div id="marble"></div>
    <Bottom></Bottom>
  </div>
</template>

<script>
  import Top from '../../components/Top'
  import Bottom from '../../components/Bottom'
  import Matter from "matter-js"
  export default {
    name: 'marble',
    components: {Top, Bottom},
    mounted() {
      let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Events = Matter.Events,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

      // create engine
      let engine = Engine.create(),
        world = engine.world;

      // create renderer
      let render = Render.create({
        element: document.documentElement.querySelector('#marble'),
        engine: engine,
        options: {
          width: document.documentElement.clientWidth,
          height: 700,
          showAngleIndicator: true
        }
      });

      Render.run(render);

      // create runner
      let runner = Runner.create();
      Runner.run(runner, engine);

      // add bodies
      let ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true }),
        rockOptions = { density: 0.004 },
        rock = Bodies.circle(170, 450, 20, rockOptions),
        anchor = { x: 170, y: 450 },
        elastic = Constraint.create({
          pointA: anchor,
          bodyB: rock,
          stiffness: 0.05
        });

      let pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 25, 40);
      });

      let ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true });

      let pyramid2 = Composites.pyramid(550, 0, 5, 10, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 25, 40);
      });

      // 软体
      let cloth = Composites.softBody(800, 100, 5, 20, 1, 1, false, 8, {
        render: {
          visible: false
        }
      });
      for (let i = 0; i < 5; i++) {
        cloth.bodies[i].isStatic = true;
      }

      World.add(engine.world, [ground, pyramid, ground2, pyramid2, rock, elastic, cloth]);

      Events.on(engine, 'afterUpdate', function() {
        if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
          rock = Bodies.circle(170, 450, 20, rockOptions);
          World.add(engine.world, rock);
          elastic.bodyB = rock;
        }
      });

      // add mouse control
      let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false
            }
          }
        });

      World.add(world, mouseConstraint);

      // keep the mouse in sync with rendering
      render.mouse = mouse;

      // fit the render viewport to the scene
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
      });
    }
  }
</script>

<style scoped="">
</style>
