<template lang="pug">
  form.privacy-form(@submit.prevent='submit(processed_form, form.url)')
    slot(name="title")
    vue-form-generator(:schema="form.schema" :model="form.model" :options="form.formOptions")
    .privacy-form__agree(v-if="havePrivacy")
      input(type="checkbox", v-model="isAgree", :id="'privacy-'+_uid")
      label(:for="'privacy-'+_uid")
        slot(name="privacy")
    .privacy-form__button
      button.button(type="submit", :disabled="!isAgree") 
        slot(name="button") Отправить
    slot(name="success", v-if="isSent") Успех
</template>


<script>
import VueFormGenerator from "vue-form-generator";

export default {
  name: "PrivacyForm",
  components: {
    "vue-form-generator": VueFormGenerator.component
  },
  props: {
    form: Object,
  },
  data() {
    return {
      isAgree: false,
      isSent: false,
    }
  },
  computed: {
    havePrivacy() {
      return !!this.$slots['privacy'];
    },
    processed_form() {
      var data = [];
      for (var i = 0; i < this.form.schema.fields.length; i++) {
        var field = this.form.schema.fields[i];
        var entry = {};
        entry.label = field.label;
        entry.data = this.form.model[field.model];
        data.push(entry);
      }
      return {
        form_data: data,
        subject: this.form.subject
      };
    }
  },
  methods: {
    submit(data, url) {
      // var { counterId, goalId } = this.form.yaMetricConfig; 
      var self = this;
      this.post(data, url, function(result) {
        if (result) {
          // self.reachGoal(counterId, goalId);
          for (var field in self.form.model) {
            self.form.model[field] = null;
            
          }
          self.isAgree = false;
          self.isSent = true;
          setTimeout(function() {
            self.isSent = false;
          }, 3e3);
        }
      });
    },
    post: function post(data, url, success) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, !0);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(data));
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          success(xhr.responseText);
        }
      };
    },
    // reachGoal(counterId, goalId) {
    //   try {
    //     window[`yaCounter${counterId}`].reachGoal(goalId);
    //   } catch(error) {
    //     console.error('Как жаль, что вы блокируете рекламу ;( Мы могли бы сделать наш сервис лушче'); // eslint-disable-line
    //   }
    // }
  }
};
</script>

<style lang="scss">
.privacy-form {
  &__button {
    margin-top: 1em;
  }
  &__agree {
    input {
      vertical-align: top;
      margin-right: 0.4em;
    }
  }
}
</style>
