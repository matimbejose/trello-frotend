<template>
  <div class="login-container">
    <Form @submit="signUp" class="login-form">
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
        <Field
          type="password"
          name="passwordConfirm"
          class="form-control"
          placeholder="Ex: *********"
          v-model="passwordConfirm"
          :rules="isRequired"
        />
        <ErrorMessage style="color: red" name="passwordConfirm" />
      </div>

      <button type="submit" class="btn btn-primary submi">Criar conta</button>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import axios from "axios";
import baseURL from "../../services/api";

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
    async signUp() {
      try {
        const response = await axios.post(`${baseURL}/register`, {
          name: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirm,
        });
        if (response.data.status === 201) {
          // Armazenar o token de autenticação no localStorage
          localStorage.setItem("jwtToken", response.data.data.token);
          alert("Usuário criado com sucesso");
          this.$router.push("/dashboard");
        } else {
          alert("Erro ao criar usuário");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        alert("Error creating user");
      }
    },

    isRequired(value) {
      if (value && value.trim()) {
        return true;
      }
      return "Este campo é obrigatório";
    },
    validateEmail(value) {
      if (!value) {
        return "Este campo é obrigatório";
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "Este não é um e-mail válido";
      }
      return true;
    },
  },
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
  width: 450px;
  padding: 35px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.form-control {
  width: 100%;
  padding: 4px;
}
</style>
