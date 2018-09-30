
<template lang="pug">
  div.feedback
    privacy-form(:form="form")
      .feedback__title(slot="title") Связаться с нами
      span(slot="privacy").feedback__privacy Я согласен с условиями пользовательского соглашения
</template>

<script>
export default {
  name: 'Feedback',
  props: {
    content: Object,
  },
  data() {
    return {
      form: {
        model: {
          name: "",
          phone: "",
          message: "",
        },
        schema: {
          fields: [{
            type: "input",
            inputType: "text",
            label: "Имя", // todo make i18n
            model: "name",
            required: true,
            placeholder: "Имя", // todo make i18n
          },{
            type: "input",
            inputType: "text",
            label: "Телефон", // todo make i18n
            model: "name",
            required: true,
            placeholder: "Телефон", // todo make i18n
          },{
            type: "textArea",
            label: "Сообщение", // todo make i18n
            model: "bio",
            placeholder: "Сообщение", // todo make i18n
            rows: 4,
          },]
        },
        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true
        }
      }
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.feedback {
  &__title {
    font-size: $base * 1.2;
    margin-bottom: 1em;
  }
  &__privacy {
    color: $color-background--light;
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
  .form-group {
    margin-bottom: 1em;
    label {
      display: none;
    }
  }
}
</style>
