<template>
  <div
    class="main"
    style="position: fixed; top: 0; left: 0; right: 0; z-index: 100"
  >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <img
          src="../assets/LogoPhd.png"
          class="img-fluid"
          alt="Hunt and discover newly registered phishing domains"
          width="180px"
        />
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
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <div class="d-flex">
            <button
              @click.prevent="signin"
              class="btn btn-outline-success submi"
              style="margin-right: 5px"
            >
              Entrar
            </button>

            <button
              @click.prevent="signup"
              class="btn btn-outline-success submi"
            >
              Registar
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      
    }
  },
  methods: {
    signin() {
      this.$router.push("/signin");
    },
    signup() {
      this.$router.push("/signup");
    },
  }
};
</script>

<style lang="css" scoped>
</style>
