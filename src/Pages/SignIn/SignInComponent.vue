<template>
  <div class="login-container">
    <Form @submit="signIn" class="login-form">
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

      <button type="submit" class="btn btn-primary submi">Entrar</button>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import axios from "axios";
import baseURL from "../../services/api";

export default {
  name: "SignInComponent",
  components: { Form, Field, ErrorMessage },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async signIn() {
      try {
        const response = await axios.post(`${baseURL}/loginuser`, {
          email: this.email,
          password: this.password,
        });
        if (response.data.status === 200) {
          // Store the authentication token in localStorage
          localStorage.setItem("jwtToken", response.data.data.token);
          this.$router.push("/dashboard");
        } else {
          alert(response.message);
        }
      } catch (error) {
          alert("Erro insperado. Tente novamente mais tarde");
      }
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
      if (!/.+@.+\..+/.test(value)) {
        return "Este não é um e-mail válido";
      }

      return true;
    },
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
  width: 450px; /* Increases the width of the form */
  padding: 35px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.form-control {
  width: 100%; /* Makes the inputs occupy the entire width of the container */
  padding: 10px;
  padding: 4px;
}
</style>
