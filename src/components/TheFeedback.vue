
<template lang="pug">
  form.feedback
    .feedback__title {{ content.common.feedback_form.title }}
    .feedback__field
      label.feedback__label(for="feedback_position") {{content.common.feedback_form.position}}
      input.feedback__input(name="feedback_position" id="feedback_position" type="text" :placeholder="content.common.feedback_form.position")
    .feedback__field
      label.feedback__label(for="feedback_name") {{content.common.feedback_form.name}}
      input.feedback__input(name="feedback_name" id="feedback_name" type="text" :placeholder="content.common.feedback_form.name")
    .feedback__field
      label.feedback__label(for="feedback_phone") {{content.common.feedback_form.phone}}
      input.feedback__input(name="feedback_phone" id="feedback_phone" type="text" :placeholder="content.common.feedback_form.phone")
    .feedback__field
      label.feedback__label(for="feedback_email") {{content.common.feedback_form.email}}
      input.feedback__input(name="feedback_email" id="feedback_email" type="email" :placeholder="content.common.feedback_form.email")
    .feedback__field
      label.feedback__label(for="feedback_resume") {{content.common.feedback_form.resume}}
      input(name="feedback_resume" id="feedback_resume" type="file" :placeholder="content.common.feedback_form.resume")
    .feedback__field
      label.feedback__label(for="feedback_message") {{content.common.feedback_form.message}}
      textarea.feedback__input(name="feedback_message" id="feedback_message" :placeholder="content.common.feedback_form.message")
    .feedback__field
      input.feedback__input(name="feedback_agreement" id="feedback_agreement" type="checkbox" v-model="isAgree")
      label.feedback__label.feedback__label--inline(for="feedback_agreement") {{ content.common.feedback_form.agreement }}
    input(type="hidden" name="_gotcha")
    button.button(type="submit" :disabled="!isAgree") {{ content.common.feedback_form.send }}
    .feedback__success {{ content.common.feedback_form.success }}
</template>

<script>
export default {
  name: 'TheFeedback',
  props: {
    content: Object,
  },
  data() {
    return {
      isAgree: false,
      isSent: false,
    }
  },
  computed: {
  }
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.feedback {
  padding: 1em 0;
  &__title {
    margin-bottom: 1em;
  }
  &__field {
    margin-bottom: 1em;
  }
  &__privacy {
    color: $color-background--light;
  }
  &__success {
    margin-top: 1em;
  }
  &__label {
    display: none;
    &--inline {
      display: inline-block;
      margin-left: 0.4em;
    }
  }

  fieldset {
    border: 0;
    padding: 0;
    margin: 0;
  }

  &__input {
    background: none;
    border: none;
    padding: 0.5em 0;
    margin: 0;
    border-bottom: 1px solid $color-background--light;
    color: $color-text;
  }
  ::-webkit-input-placeholder {
    color: $color-background--light;
  }
  ::-moz-placeholder {
    color: $color-background--light;
  }
  :-ms-input-placeholder {
    color: $color-background--light;
  }
  :-moz-placeholder {
    color: $color-background--light;
  }
  textarea {
    resize: vertical;
  }
  input[type="button"],
  input[type="date"],
  input[type="datetime-local"],
  input[type="email"],
  input[type="month"],
  input[type="number"],
  input[type="password"],
  input[type="range"],
  input[type="reset"],
  input[type="search"],
  input[type="submit"],
  input[type="tel"],
  input[type="text"],
  input[type="time"],
  input[type="url"],
  input[type="week"],
  textarea {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
