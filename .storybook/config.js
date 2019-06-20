import Vue from 'vue';
import {Plugin} from 'vue-fragment'
import {configure} from '@storybook/vue'

Vue.use(Plugin)

function loadStories() {
  require('./index')
}

configure(loadStories, module)
