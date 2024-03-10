---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Vue.js multiple theme with css variable'
pubDate: '2021-01-17'
slug: 'vue-multiple-theme'
description: 'Recently, I develop a customizable npm package for the color mode in Vue.js with CSS variable.'
cover: '/images/vue-template.webp'
coverAlt: 'vue multiple theme'
tags: ['Vue.js', 'Component']
---

### Intro

Recently, I develop a customizable npm package for the color mode in Vue.js with CSS variable. this package helps us to manage the theme mode pretty easily.
In this article, I describe the functionality of this component.
You would download this package at this [URL](https://www.npmjs.com/package/vue-multiple-themes).

### How to use Vue.js multiple theme component

- Install the package with this command `npm i vue-multiple-themes` OR `yarn add vue-multiple-themes`
- Import and register component in your desire place
- Follow the below steps:

```javascript
<template>
  <div>
    <vue-multiple-themes
          :defaultTheme="'light'"
          :themeColorList="[
            'light',
            'dark',
            'sepia',
            'black',
            'coffee',
            'rose',
          ]"
          :changeThemeOff="true"
        ></vue-multiple-themes>
  </div>
</template>

<script>
import VueMultipleThemes from "vue-multiple-themes";
export default {
  components: { VueMultipleThemes }
};
</script>
```

- You can override the main CSS in component

```css

<style lang="css" >
:root {
  --app-background-color: #ffffff;
  --app-title-color: #333333;
  --app-subtitle-color: #555555;
}

[theme="dark"] {
  --app-background-color: #333333;
  --app-title-color: #ffffff;
  --app-subtitle-color: #dddddd;
}
[theme="sepia"] {
  --app-background-color: #d0bc91;
  --app-title-color: #8a6c44;
  --app-subtitle-color: #5f4938;
}

[theme="black"] {
  --app-background-color: #000000;
  --app-title-color: #ffffff;
  --app-subtitle-color: #dddddd;
}

[theme="coffee"] {
  --app-background-color: #394545;
  --app-title-color: #aab1b3;
  --app-subtitle-color: #e9e5e3;
}

[theme="rose"] {
  --app-background-color: #2e1a1e;
  --app-title-color: #bcb8ce;
  --app-subtitle-color: #d5ddef;
}

.app-background {
  background-color: var(--app-background-color);
}

.app-title {
  color: var(--app-title-color);
}

.app-subtitle {
  color: var(--app-subtitle-color);
  padding-top: 10px;
}

.change-theme-box {
  cursor: pointer;
  color: var(--app-subtitle-color);
  font-size: 20px;
  font-weight: bold;
}
</style>

```

<!-- ### How to write multiple theme mode component? -->
