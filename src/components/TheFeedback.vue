
<template lang="pug">
  div.feedback
    privacy-form(:form="form")
      .feedback__title(slot="title") {{ content.common.feedback_form.title }}
      span(slot="privacy").feedback__privacy {{ content.common.feedback_form.agreement }}
      .feedback__success(slot="success") {{ content.common.feedback_form.success }}
      span(slot="button") {{ content.common.feedback_form.send }}
</template>

<script>
export default {
  name: 'TheFeedback',
  props: {
    content: Object,
  },
  computed: {
    form() {
      return {
        model: {
          position: "",
          name: "",
          phone: "",
          email: "",
          resume: "",
          message: "",
        },
        schema: {
          fields: [
            {
              type: "input",
              inputType: "text",
              inputName: "position",
              label: this.content.common.feedback_form.position,
              model: "position",
              required: true,
              placeholder: this.content.common.feedback_form.position,
            },
            {
              type: "input",
              inputType: "text",
              inputName: "name",
              label: this.content.common.feedback_form.name,
              model: "name",
              required: true,
              placeholder: this.content.common.feedback_form.name,
            },
            {
              type: "input",
              inputType: "text",
              inputName: "phone",
              label: this.content.common.feedback_form.phone,
              model: "phone",
              required: true,
              placeholder: this.content.common.feedback_form.phone,
            },
            {
              type: "input",
              inputType: "text",
              inputName: "email",
              label: this.content.common.feedback_form.email,
              model: "email",
              required: true,
              placeholder: this.content.common.feedback_form.email,
            },
            {
              type: "input",
              inputType: "text",
              inputName: "resume",
              label: this.content.common.feedback_form.resume,
              model: "resume",
              required: false,
              placeholder: this.content.common.feedback_form.resume,
            },
            {
              type: "textArea",
              inputName: "message",
              label: this.content.common.feedback_form.message,
              model: "message",
              placeholder: this.content.common.feedback_form.message,
              rows: 4,
            },
          ]
        },
        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true
        },
        url: "/process.php",
        subject: this.content.common.feedback_form.subject,
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.feedback {
  &__title {
    margin-bottom: 1em;
  }
  &__privacy {
    color: desaturate(lighten($color: $color-background, $amount: 50), 10);
  }
  &__success {
    margin-top: 1em;
  }

  fieldset {
    border: 0;
    padding: 0;
    margin: 0;
  }
  input,
  textarea {
    background: none;
    border: none;
    padding: 0.5em 0;
    margin: 0;
    border-bottom: 1px solid $color-background--light;
    color: $color-text;
  }
  ::-webkit-input-placeholder {
    color: desaturate(lighten($color: $color-background, $amount: 50), 10);
  }
  ::-moz-placeholder {
    color: desaturate(lighten($color: $color-background, $amount: 50), 10);
  }
  :-ms-input-placeholder {
    color: desaturate(lighten($color: $color-background, $amount: 50), 10);
  }
  :-moz-placeholder {
    color: desaturate(lighten($color: $color-background, $amount: 50), 10);
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
  .form-group {
    margin-bottom: 1em;
    label {
      display: none;
    }
  }
}
</style>
