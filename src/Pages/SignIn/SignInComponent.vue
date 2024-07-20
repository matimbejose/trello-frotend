<template>
  <div class="login-container">
    <Form @click="submit" class="login-form">
      <h2 class="mb-4"></h2>

      <div class="mb-4 text-start"></div>

      <div class="mb-4 mr-100 text-start">
        <p>Email</p>
        <Field
          type="text"
          name="email"
          class="form-control"
          placeholder="Ex: matimbe@mail.com"
          v-model="email"
          :rules="validateEmail"
        />
        <ErrorMessage style="color: red" name="email" />
      </div>

      <div class="mb-4 text-start">
        <p>Senha</p>
        <Field
          type="password"
          name="password"
          class="form-control"
          placeholder="Ex: *********"
          v-model="password"
          :rules="isRequired"
        />
        <ErrorMessage style="color: red" name="password" />
      </div>

      <button @click="signUp" type="submit" class="btn btn-primary submi">
        Entrar
      </button>
    </Form>
  </div>
</template>
<script>
import { Field, Form, ErrorMessage } from "vee-validate";

export default {
  name: "SignInComponent",
  components: { Form, Field, ErrorMessage },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    signUp() {},

    isRequired(value) {
      if (value && value.trim()) {
        return true;
      }

      return "Este campo é obrigatório";
    },
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return "Este campo é obrigatório";
      }

      // if the field is not a valid email
      if (!/.+@.+\..+/.test(value)) {
        return "Este não é um e-mail válido";
      }

      return true;
    },
  },

  mounted() {},

  created() {
    this.username = this.$route.params.username;
  },
};
</script>
<style lang="css" scoped>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 450px; /* Aumenta a largura do formulário */
  padding: 35px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.form-control {
  width: 100%; /* Faz os inputs ocuparem toda a largura do container */
  padding: 10px;
  padding: 4px;
}
</style>

