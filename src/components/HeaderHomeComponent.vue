<template>
  <div class="header">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form class="d-flex">
            <button @click="Logout" class="btn custom-btn" type="submit">
              Sair
              <font-awesome-icon icon="power-off" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HeaderHomeComponent",
  data() {
    return {};
  },

  methods: {
    Logout() {
      localStorage.removeItem("jwtToken");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="css" scoped>
.header {
  background-color: #0d2b75 !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.custom-btn {
  background-color: white;
  color: #0d2b75;
  border: 1px solid #0d2b75; /* Se você também quiser a borda na cor personalizada */
}

.custom-btn:hover {
  background-color: #f0f0f0; /* Cor de fundo ao passar o mouse (opcional) */
  color: #0d2b75; /* Garante que a cor das letras continue a mesma ao passar o mouse */
}
</style>
