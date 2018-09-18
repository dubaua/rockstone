<template lang="pug">
  #app(v-if="isLoaded")
    button(@click="setLanguage('ru')") RU
    button(@click="setLanguage('en')") EN
    overview(:content="currentLanguage")
    how-we-work(:content="currentLanguage")
    our-projects(:content="currentLanguage")
    how-to-work-with-us(:content="currentLanguage")
</template>

<script>
import api from '@/api/';
import Overview from '@/components/Overview';
import HowWeWork from '@/components/HowWeWork';
import OurProjects from '@/components/OurProjects';
import HowToWorkWithUs from '@/components/HowToWorkWithUs';

export default {
  name: 'app',
  components: {
    Overview,
    HowWeWork,
    OurProjects,
    HowToWorkWithUs,
  },
  data() {
    return {
      isLoaded: false,
      currentLanguageCode: 'ru',
      content: {
        ru: {
          common: null,
          careers: null,
          how_to_work_with_us: null,
          how_we_work: null,
          our_projects: null,
        },
        en: {
          common: null,
          careers: null,
          how_to_work_with_us: null,
          how_we_work: null,
          our_projects: null,
        },
      },
    }
  },
  computed: {
    currentLanguage() {
      return this.content[this.currentLanguageCode];
    },
  },
  mounted: function () {
    var self = this;
    Promise.all([
      api.getRegionByKey('common_ru'),
      api.getRegionByKey('common_en'),
      api.getCollectionByKey('careers_ru'),
      api.getCollectionByKey('careers_en'),
      api.getCollectionByKey('how_to_work_with_us_ru'),
      api.getCollectionByKey('how_to_work_with_us_en'),
      api.getCollectionByKey('how_we_work_ru'),
      api.getCollectionByKey('how_we_work_en'),
      api.getCollectionByKey('our_projects_ru'),
      api.getCollectionByKey('our_projects_en'),
    ]).then(result => {
      var [
          common_ru,
          common_en,
          careers_ru,
          careers_en,
          how_to_work_with_us_ru,
          how_to_work_with_us_en,
          how_we_work_ru,
          how_we_work_en,
          our_projects_ru,
          our_projects_en,
        ] = result;
      self.content.ru.common = common_ru;
      self.content.en.common = common_en;
      self.content.ru.careers = careers_ru;
      self.content.en.careers = careers_en;
      self.content.ru.how_to_work_with_us = how_to_work_with_us_ru;
      self.content.en.how_to_work_with_us = how_to_work_with_us_en;
      self.content.ru.how_we_work = how_we_work_ru;
      self.content.en.how_we_work = how_we_work_en;
      self.content.ru.our_projects = our_projects_ru;
      self.content.en.our_projects = our_projects_en;
      self.isLoaded = true;
    })
  },
  methods: {
    setLanguage(languageCode) {
      this.currentLanguageCode = languageCode;
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: "Montserrat", sans-serif;
}
</style>
