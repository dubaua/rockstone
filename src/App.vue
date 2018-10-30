<template lang="pug">
  #app(v-if="isLoaded")
    scroll-container(@change="onScrollChange", :class="getPageClass").page
      .noise-overlay.noise-bg
      the-navigation(:content="currentLanguage")
      mq-layout(mq="lg+")
        page-state
      scroll-item(id="homescreen")
        the-homescreen(id="homescreen")
      scroll-item(id="whoWeAre")
        who-we-are(:content="currentLanguage" id="whoWeAre")
      scroll-item(id="howWeWork")
        how-we-work(:content="content" id="howWeWork")
      scroll-item(id="ourProjects")
        our-projects(:content="content" id="ourProjects")
      scroll-item(id="howToWorkWithUs")
        how-to-work-with-us(:content="content" id="howToWorkWithUs")
      scroll-item(id="careers")
        the-careers(:content="content" id="careers")
      scroll-item(id="contact")
        the-contact(:content="currentLanguage" id="contact")
      slide-in(
        direction="left",
        :isActive="page.isProjectOpen",
        :onClose="closeProject",
        )
        h2.subtitle {{currentProjectTitle}}
        .typographic(v-html="currentProjectMore")
      slide-in(
        direction="left",
        :isActive="page.isPositionOpen",
        :onClose="closePosition",
        )
        h2.subtitle.hidden-en {{currentPosition.title_ru}}
        h2.subtitle.hidden-ru {{currentPosition.title_en}}
        p.hidden-en {{currentPosition.city_ru}}
        p.hidden-ru {{currentPosition.city_en}}
        .typographic.hidden-en(v-html="currentPosition.details_ru")
        .typographic.hidden-ru(v-html="currentPosition.details_en")
      slide-in(
        direction="left",
        :isActive="page.isFeedbackOpen",
        :onClose="closeFeedback",
        noScroll,
        )
        the-feedback(:content="currentLanguage")
      slide-in(
        direction="right",
        :isActive="page.isMenuOpen",
        :onClose="closeMenu",
        noClose,
        noScroll,
        isWide,
        )
        side-menu(:content="currentLanguage")
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
import $ from 'jquery';

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
      currentSectionId: '',
      isScrolling: false,
      isLoaded: false,
      content: {
        ourProjects: null,
        HowWeWork: null,
        howToWorkWithUs: null,
        careers: null,
        ru: {
          common: null,
        },
        en: {
          common: null,
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
      return this.content.careers[this.page.currentPosition];
    },
    currentProject() {
      return this.content.ourProjects[this.page.currentProject];
    },
    currentProjectTitle() {
      return this.currentProject[`title_${this.page.currentLanguageCode}`];
    },
    currentProjectMore() {
      return this.currentProject[`more_${this.page.currentLanguageCode}`];
    },
    getPageClass() {
      return `page--${this.page.currentLanguageCode}`;
    },
  },
  mounted: function () {
    var self = this;
    Promise.all([
      api.getRegionByKey('common_ru'),
      api.getRegionByKey('common_en'),
      api.getCollectionByKey('careers'),
      api.getCollectionByKey('howToWorkWithUs'),
      api.getCollectionByKey('howWeWork'),
      api.getCollectionByKey('ourProjects'),
    ]).then(result => {
      var [
          common_ru,
          common_en,
          careers,
          howToWorkWithUs,
          howWeWork,
          ourProjects,
        ] = result;
      self.content.ru.common = common_ru;
      self.content.en.common = common_en;
      self.content.careers = careers;
      self.content.howToWorkWithUs = howToWorkWithUs;
      self.content.howWeWork = howWeWork;
      self.content.ourProjects = ourProjects;
      self.isLoaded = true;
    });

    window.addEventListener('scroll', this.onScroll);

    this.$nextTick(()=> {
      const hash = window.location.hash;
      const scrollToTimerInterval = 1500;

      let scrollToTimerId = setTimeout(function tick() {
        const initialSectionId = hash ? hash.replace(/^#/, '') : 'homescreen';
        self.animatedScrollTo(initialSectionId, function() {
          clearTimeout(scrollToTimerId);
        })
        scrollToTimerId = setTimeout(tick, scrollToTimerInterval);
      }, scrollToTimerInterval);
      

      $(document).on('mousewheel DOMMouseScroll', function (event) {
        if (self.isScrolling || $(event.target).closest('.js-prevent-scroll').length) {
          event.stopPropagation();
          return false;
        }

        const wheelDirection = event.originalEvent.wheelDelta || -event.originalEvent.detail;

        if (wheelDirection < 0) {
          self.animatedScrollTo(self.$store.state.sections[self.currentSectionId].next);
        } else {
          self.animatedScrollTo(self.$store.state.sections[self.currentSectionId].prev);
        }

        event.preventDefault();
      });
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
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
    onScroll() {
      if (window.scrollY === 0) {
        this.$store.dispatch('resetPage');
      }
    },
    onScrollChange(payload) {
      this.$store.commit('setSectionsState', payload);
    },
    animatedScrollTo(sectionId, callback) {
      if (!sectionId) return;

      const self = this;

      self.isScrolling = true;

      const currentSectionNode = document.getElementById(sectionId);

      $('html,body').animate(
        {
          scrollTop: currentSectionNode.offsetTop
        },
        1000,
        // 'easeInOut',
        function () {
          if (currentSectionNode) {
            currentSectionNode.removeAttribute('id');
          }

          self.currentSectionId = sectionId;
          window.location.hash = sectionId;

          if (currentSectionNode) {
            currentSectionNode.setAttribute('id', sectionId);
          }

          self.isScrolling = false;
          
          if (callback) {
            callback();
          }
        }
      );
    }
  },
}
</script>
