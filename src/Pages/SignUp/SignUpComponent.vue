<template>
  <div class="login-container">
    <Form class="login-form">
      <h2 class="mb-4"></h2>

      <div class="mb-4 mr-100 text-start">
        <p>Nome</p>
        <Field
          type="text"
          name="username"
          class="form-control"
          placeholder="Ex: JohnDoe"
          v-model="username"
          :rules="isRequired"
        />
        <ErrorMessage style="color: red" name="username" />
      </div>

      <div class="mb-4 mr-100 text-start">
        <p>Email</p>
        <Field
          type="text"
          name="email"
          class="form-control"
          placeholder="Ex: JohnDoe@mail.com"
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

      <div class="mb-4 text-start">
        <p>Confirmar a senha</p>
        <input
          type="password"
          name="passwordConfirm"
          class="form-control"
          placeholder="Ex: *********"
          v-model="passwordConfirm"
          :rules="isRequired"
        />
        <ErrorMessage style="color: red" name="password" />
      </div>

      <button @click="submitForm" type="submit" class="btn btn-primary submi">
        Criar conta
      </button>
    </Form>
  </div>
</template>


<script>
// import cognitoService from "@/services/cognitoService";
import { Field, Form, ErrorMessage } from "vee-validate";

export default {
  name: "SignUpComponent",
  components: { Form, Field, ErrorMessage },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
  },
  methods: {
    submitForm() {
    },
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
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "Este não é um e-mail válido";
      }
      // All is good
      return true;
    },
  },

  mounted() {},

  created() {},
};
</script>


<style scoped>
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
  padding: 4px;
}
</style>