
<template lang="pug">
  div.feedback
    privacy-form(:form="form")
      .feedback__title(slot="title") Связаться с нами
      span(slot="privacy").feedback__privacy Я согласен на обработку персональных данных
      .feedback__success(slot="success") Сообщение успешно отправлено
</template>

<script>
export default {
  name: 'TheFeedback',
  props: {
    content: Object,
  },
  data() {
    return {
      form: {
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
              label: "Желаемая должность", // todo make i18n
              model: "position",
              required: true,
              placeholder: "Желаемая должность", // todo make i18n
            },
            {
              type: "input",
              inputType: "text",
              inputName: "name",
              label: "Ваше имя", // todo make i18n
              model: "name",
              required: true,
              placeholder: "Ваше имя", // todo make i18n
            },
            {
              type: "input",
              inputType: "text",
              inputName: "phone",
              label: "Телефон", // todo make i18n
              model: "phone",
              required: true,
              placeholder: "Телефон", // todo make i18n
            },
            {
              type: "input",
              inputType: "text",
              inputName: "email",
              label: "Электронная почта", // todo make i18n
              model: "email",
              required: true,
              placeholder: "Электронная почта", // todo make i18n
            },
            {
              type: "input",
              inputType: "text",
              inputName: "resume",
              label: "Ссылка на резюме", // todo make i18n
              model: "resume",
              required: true,
              placeholder: "Ссылка на резюме", // todo make i18n
            },
            {
              type: "textArea",
              inputName: "message",
              label: "Комментарий", // todo make i18n
              model: "message",
              placeholder: "Комментарий", // todo make i18n
              rows: 4,
            },
          ]
        },
        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true
        },
        url: "/process.php",
        subject: "Сообщение с сайта Rockstone",
      }
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.feedback {
  padding: 1em 0;
  &__title {
    margin-bottom: 1em;
  }
  &__privacy {
    color: $color-background--light;
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
