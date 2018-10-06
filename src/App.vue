<template lang="pug">
  #app(v-if="isLoaded")
    parallax-container
      scroll-container(@change="setSectionsState").page
        .noise-overlay.noise-bg
        the-navigation(:content="currentLanguage")
        mq-layout(mq="lg+")
          page-state
        scroll-item(id="homescreen")
          the-homescreen(id="homescreen")
        scroll-item(id="whoWeAre")
          who-we-are(:content="currentLanguage" id="whoWeAre")
        scroll-item(id="howWeWork")
          how-we-work(:content="currentLanguage" id="howWeWork")
        scroll-item(id="ourProjects")
          our-projects(:content="currentLanguage" id="ourProjects")
        scroll-item(id="howToWorkWithUs")
          how-to-work-with-us(:content="currentLanguage" id="howToWorkWithUs")
        scroll-item(id="careers")
          the-careers(:content="currentLanguage" id="careers")
        scroll-item(id="contact")
          the-contact(:content="currentLanguage" id="contact")
        slide-in(
          direction="right",
          :isActive="page.isMenuOpen",
          :onClose="closeMenu",
          noClose,
          noScroll,
          isWide,
          )
          side-menu(:content="currentLanguage")
        slide-in(
          direction="left",
          :isActive="page.isFeedbackOpen",
          :onClose="closeFeedback",
          )
          the-feedback(:content="currentLanguage")
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
</template>

<script>
import api from '@/api/';
import TheNavigation from '@/components/TheNavigation';
import PageState from '@/components/PageState';
import SideMenu from '@/components/SideMenu';
import TheHomescreen from '@/components/TheHomescreen';
import WhoWeAre from '@/components/WhoWeAre';
import HowWeWork from '@/components/HowWeWork';
import OurProjects from '@/components/OurProjects';
import HowToWorkWithUs from '@/components/HowToWorkWithUs';
import TheCareers from '@/components/TheCareers';
import TheContact from '@/components/TheContact';
import TheFeedback from '@/components/TheFeedback';
import { ScrollContainer, ScrollItem } from '@/components/vue-scrollmonitor'
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'app',
  components: {
    TheNavigation,
    PageState,
    SideMenu,
    TheHomescreen,
    WhoWeAre,
    HowWeWork,
    OurProjects,
    HowToWorkWithUs,
    TheCareers,
    TheContact,
    TheFeedback,
    ScrollContainer,
    ScrollItem,
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
    ...mapMutations(['setSectionsState']),
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
