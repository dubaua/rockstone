<template lang="pug">
  #app(v-if="isLoaded")
    .page(
      v-touch:swipe.left="closeMenu",
    )
      navigation(:content="currentLanguage")
      mq-layout(mq="lg+")
        page-state
      a(name="homescreen")
      homescreen
      a(name="overview")
      overview(:content="currentLanguage")
      a(name="how-we-work")
      how-we-work(:content="currentLanguage")
      a(name="our-projects")
      our-projects(:content="currentLanguage")
      a(name="how-to-work-with-us")
      how-to-work-with-us(:content="currentLanguage")
      a(name="careers")
      careers(:content="currentLanguage")
      a(name="contact")
      contact(:content="currentLanguage")

      slide-in(
        direction="right",
        :isActive="page.isMenuOpen",
        :onClose="closeMenu",
        isWide,
        noClose,
        )
        | Меню
      slide-in(
        direction="left",
        :isActive="page.isFeedbackOpen",
        :onClose="closeFeedback",
        )
        feedback(:content="currentLanguage")
      slide-in(
        direction="left",
        :isActive="page.isProjectOpen",
        :onClose="closeProject",
        )
        h2.subtitle {{currentProject.title}}
        p {{currentProject.city}}
        .typographic(v-html="currentProject.more")
      slide-in(
        direction="left",
        :isActive="page.isPositionOpen",
        :onClose="closePosition",
        )
        h2.subtitle {{currentPosition.title}}
        p {{currentPosition.city}}
        .typographic(v-html="currentPosition.details")
      overlay
      .noise-overlay.noise-bg
</template>

<script>
import api from '@/api/';
import Navigation from '@/components/Navigation';
import PageState from '@/components/PageState';
import Homescreen from '@/components/Homescreen';
import Overview from '@/components/Overview';
import HowWeWork from '@/components/HowWeWork';
import OurProjects from '@/components/OurProjects';
import HowToWorkWithUs from '@/components/HowToWorkWithUs';
import Careers from '@/components/Careers';
import Contact from '@/components/Contact';
import Feedback from '@/components/Feedback';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
    Navigation,
    PageState,
    Homescreen,
    Overview,
    HowWeWork,
    OurProjects,
    HowToWorkWithUs,
    Careers,
    Contact,
    Feedback,
  },
  data() {
    return {
      isLoaded: false,
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
    ...mapState(['page']),
    currentLanguage() {
      return this.content[this.page.currentLanguageCode];
    },
    currentPosition() {
      return this.currentLanguage.careers[this.page.currentPosition];
    },
    currentProject() {
      return this.currentLanguage.our_projects[this.page.currentProject];
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
    ...mapActions(['setByKey']),
    closeMenu() {
      this.setByKey({key: 'isMenuOpen', value: false});
    },
    closeFeedback() {
      this.setByKey({key: 'isFeedbackOpen', value: false});
    },
    closeProject() {
      this.setByKey({key: 'isProjectOpen', value: false});
    },
    closePosition() {
      this.setByKey({key: 'isPositionOpen', value: false});
    },
  },
}
</script>
