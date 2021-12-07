# GlimmerX Workshop

<img align="right" width="95" height="95"
     alt="Glimmer Experimental Favicon"
     src="./favicon.svg">


This is full featured SPA application created using [GlimmerX](https://github.com/glimmerjs/glimmer-experimental) library.

You can use it to explore possibilities of [GlimmerVM](https://github.com/glimmerjs/glimmer-vm) outside of [Ember.js](http://emberjs.com/) ecosystem.

### Repo includes:

* State managment examples
* Lazy component loading patterns
* GraphQL Apollo integraion
* Routing
* Server Side rendering and rehydration
* Tests
* Storybook integraion
* Typed templates

## Prerequisites

You will need the following things properly installed on your computer.

1. Ensure you have registered [github](http://github.com/) account.
1. Ensure you have [VSCode](https://code.visualstudio.com/download) installed
1. Ensure you have [NodeJS](https://nodejs.org/en/) 16.13.0 installed, if not - install [volta](https://volta.sh/)
1. Ensure you have [Yarn](https://yarnpkg.com/) 1.22.17 installed, if not - install [volta](https://volta.sh/)
1. Install [GitHub GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer) to your github profile
1. Visit [github.com/settings/tokens](https://github.com/settings/tokens) and generate empty token (without checkboxes), name may be: `glimmerx-workshop`;

## Workshop Video [RU]

| Part 1 | Part 2 |
|---|---|
|[![Workshop preview (part one)](http://img.youtube.com/vi/C-gBuD534lY/0.jpg)](http://www.youtube.com/watch?v=C-gBuD534lY "GlimmerX workshop part 1")|[![Workshop preview (part two)](http://img.youtube.com/vi/hAJJ9Y3UGvk/0.jpg)](http://www.youtube.com/watch?v=hAJJ9Y3UGvk "GlimmerX workshop part 2")|

---

## Installation

* `git clone https://github.com/lifeart/glimmerx-workshop`
* `cd glimmerx-workshop`
* `yarn`

### Running / Development

* `yarn vite` -> pure app (no ssr)
* `yarn dev` -> app + SSR
* Visit your app at [http://localhost:3000](http://localhost:3000).


### Running Tests

* `yarn test`

### Running Storybook

* `yarn storybook`


---

## Further Reading / Useful Links
1. [What Is Reactivity?](https://www.pzuraq.com/what-is-reactivity/)
1. [What Makes a Good Reactive System?](https://www.pzuraq.com/what-makes-a-good-reactive-system/)
1. [How Autotracking Works](https://www.pzuraq.com/how-autotracking-works/)
1. [Autotracking: Elegant DX Via Cutting-Edge CS](https://v5.chriskrycho.com/journal/autotracking-elegant-dx-via-cutting-edge-cs/)
1. [@use and Resources RFC](https://www.pzuraq.com/introducing-use/)
1. [Autotracking Simplified example](https://gist.github.com/pzuraq/79bf862e0f8cd9521b79c4b6eccdc4f9)

## RFC's

1. [Merged](https://emberjs.github.io/rfcs/)
1. [Active](https://github.com/emberjs/rfcs/pulls)

## Videos

1. [Glimmer 2 Deep Dive with Yehuda Katz](https://www.youtube.com/watch?v=vL8sCi1Bv6E)
1. [ReactiveConf 2017 - Tom Dale: Secrets of the Glimmer VM](https://www.youtube.com/watch?v=nXCSloXZ-wc)
1. [Virtual EmberConf 2020: Autotracking: Reactivity and State in Modern Ember by Chris Garrett
](https://www.youtube.com/watch?v=HDBSU2HCLbU)
## @tracked builtins

* [github.com/tracked-tools/tracked-built-ins](https://github.com/tracked-tools/tracked-built-ins)
* [github.com/tracked-tools/tracked-maps-and-sets](https://github.com/tracked-tools/tracked-maps-and-sets)
* [github.com/tracked-tools/tracked-toolbox](https://github.com/tracked-tools/tracked-toolbox)

## Issues created

 1. https://github.com/vitejs/vite/issues/5364
 1. https://github.com/glimmerjs/glimmer-vm/issues/1359
 1. https://github.com/glimmerjs/glimmer.js/issues/365
 1. https://github.com/typed-ember/glint/issues/224
 1. https://github.com/typed-ember/glint/issues/223
 1. https://github.com/josemarluedke/glimmer-apollo/issues/45
 1. https://github.com/josemarluedke/glimmer-apollo/issues/48
 1. https://github.com/josemarluedke/glimmer-apollo/issues/49
 1. https://github.com/josemarluedke/glimmer-apollo/issues/50


## PR's created

 1. https://github.com/eirslett/storybook-builder-vite/pull/136


## Repos created

* https://github.com/lifeart/tiny-router
* https://github.com/lifeart/vite-plugin-glimmerx

## Deps

* https://vitejs.dev/
* https://tailwindcss.com/
* https://glimmer-apollo.com/
* https://jestjs.io/
* https://storybook.js.org/
* https://github.com/glimmerjs/glimmer-experimental/
* https://github.com/lifeart/tiny-router
* https://github.com/typed-ember/glint


## Ember Courses & books 

* https://guides.emberjs.com/release/getting-started/
* https://frontendmasters.com/courses/ember-octane/
* https://balinterdi.com/rock-and-roll-with-emberjs/
