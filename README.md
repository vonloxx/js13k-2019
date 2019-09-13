# Back To The Stars✨
## My JS13k 2019 entry
This is my 2nd time participating in [JS13k games](https://js13kgames.com/) competition although I've made many attemps along the years.

### TL;DR
[You can play the game here](http://js13kgames.com/entries/back-to-the-stars).

Again, this year I didn't have too much time but I guess 95% of participants complain about the same thing. And, actually, although I kind of prepared a simple framework before, the game was basically done in 2 nights (~10h) just before the September 13th deadline.

So, what are the main development features worth talking about?
### 1. Staying away from OO programming.
Mainly because `this` keyword can't be minified. On a test project I did some time ago, this keyword counted for ~5% of the minified code. Also, I wanted the framework to be quite modular and doing it with classes can be challenging since JS can't really do multiple inheritance - an object can only have one prototype. Remember kids, classes in Javascript is just sugar syntax 👨‍🏫.

### 2. Component based framework
I opted for full functional programming using "components", which are basically functions. This way I could have a quite modular framework with no parent inheritance hell if I used classes.
Here's a simplified example how the hero object is initialized:
```javascript
const hero = compose(
  Component,
  HasSprites,
  Movable,
  HasController
)({
  /* For Movable component */
  state: {
    x: 0,
    y: 200,
    friction: 1.7,
    gravity: 10,
  }

  /* For HasSprites component */
  spritesheet: image,

  /* For HasController component */
  keys: {
     left: 37,
     right: 39,
     jump: 32,
  },

  /* For Component component */
  update({ state, setState }) {
    // If you want to add extra logic to hero object.
    setState({ x: 100});
  },
  render({ ctx, state }) {
    // If you want to add extra rendering to hero object.
    const { x, y } = state;
    ctx.text('My hero', x, y);
  },
});
```

The `Component` component is where the base attributes are. So things like render, update and state management are handled here. The other components are quite self-explanatory.
So, if we want to add extra functionality to the hero object, we would just add a component and provide some props when initializing.

Note: the compose function combines multiple functions to build a more complex one. More info here: https://www.codementor.io/michelre/use-function-composition-in-javascript-gkmxos5mj

Note 2: We could also have a `Hero` component based on the object above and then institiate the object just like this:

```javascript
const hero = Hero({
  state: { y: 300 }
});
```

Due to time constrains, the implemention of this paradigm on this project was a bit messy and would need some more thinking on how things are structured (especially state management) but it's still good as a reference.

This is definitely a subject that I'm going to dig a bit deeper for future projects. I really like how things get structured with this approach.

### 3. Background images generation - Dithering!
I wanted this game to have a kind of 8-bit retro look. What's better to achieve that than dithered images? 😜

Since the dithering algorithm processing is quite intensive, in this project I've put it on a web worker so the rendering don't get to hang. [Check the lib](https://github.com/vonloxx/js13k-2019/blob/master/src/lib/dither.js) and [check an example](https://github.com/vonloxx/js13k-2019/blob/master/src/assets/clouds.js).

## Credits
And that's it! I would also like to credit some people:
- **[Ferry Halim](http://www.ferryhalim.com/orisinal/)** For the timeless inspiration.
- **[Frank Force (ZzFx lib)](http://zzfx.3d2k.com/)** For the zuper tiny sound effects generator.
- **Unknown** for the dither algorithm. I really can't find the author. If you're the one, please ping me for proper credits.
- **[Andrzej Mazur](https://end3r.com/)** For doing an awesome job organizing [JS13k Games](http://js13kgames.com/) competition since 2012(!).