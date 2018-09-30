
<template lang="pug">
  div.player(:class="{'player--active': isPlaying}", @click="toggle")
    audio(ref="audio", loop)
    .player__bar(v-for="i in 8", :class="'player__bar--'+i")
</template>

<script>
import track from './soundtrack.mp3';
import Cookies from 'js-cookie';

export default {
  name: 'Player',
  props: {
    content: Object,
  },
  data() {
    return {
      isPlaying: false,
    }
  },
  computed: {
    audio () {
      return this.$refs.audio
    },
  },
  methods: {
    toggle () {
      if (!this.audio.paused) this.pause();
      else this.play();
    },
    play () {
      this.audio.play();
      Cookies.set('noautoplay', 'false');
    },
    pause () {
      this.audio.pause();
      Cookies.set('noautoplay', 'true');
    },
    onAudioPlay () {
      this.isPlaying = true;
    },
    onAudioPause () {
      this.isPlaying = false;
    },
    initAudio () {
      const mediaEvents = ['pause', 'play', 'playing'];
      mediaEvents.forEach(event => {
        this.audio.addEventListener(event, e => this.$emit(event, e))
      });
      this.audio.addEventListener('play', this.onAudioPlay);
      this.audio.addEventListener('pause', this.onAudioPause);
      this.audio.src = track;
    },
  },
  mounted () {
    this.initAudio();
    if (Cookies.get('noautoplay') !== 'true') {
      this.play(); // check cookie
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.player {
  $block: &;
  width: 23px;
  height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  &__bar {
    width: 2px;
    height: 1px;
    background: $color-text;
    &--1 {
      animation-duration: 0.197s;
    }
    &--2 {
      animation-duration: 0.383s;
    }
    &--3 {
      animation-duration: 0.263s;
    }
    &--4 {
      animation-duration: 0.467s;
    }
    &--5 {
      animation-duration: 0.349s;
    }
    &--6 {
      animation-duration: 0.229s;
    }
    &--7 {
      animation-duration: 0.439s;
    }
    &--8 {
      animation-duration: 0.311s;
    }
  }
  &--active {
    #{$block}__bar {
      animation-name: dance;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }
  }

  @keyframes dance {
    0% {
      height: 1px;
    }
    100% {
      height: 12px;
    }
  }
}
</style>
