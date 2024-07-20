<template>
  <div class="main">
    <HeaderComponent />

    <div class="container-fluid">
      <img
        src="../../assets/LogoPhd.png"
        class="img-fluid"
        alt="Hunt and discover newly registered phishing domains"
        style="margin-top: 100px"
      />
      <p></p>
      <h3>Hunt and discover newly registered phishing domains.</h3>
      <p>IMPORTANT!!! THIS WEBSITE WILL BE DECOMMISSIONED SOON!</p>
      <p>
        For advanced features and a longer than 24 hours period search, check
        the
        <a href="https://github.com/atenreiro/opensquat" target="_blank"
          >openSquat</a
        >
      </p>
      <p>
        Domains registered yesterday:
        <span class="change-domain">160,381 </span>
      </p>

      <div class="row py-5">
        <div
          class="form-group col-xl-9 col-md-12 d-flex justify-content-center m-auto"
        >
          <input
            class="form-control keyword-input"
            id="uname"
            name="keyword"
            placeholder="keyword (e.g. paypal)"
            required=""
            type="text"
            value=""
            v-model="domain"
          />
        </div>
        <div
          class="col-xl-4 col-md-6 d-flex justify-content-center py-4 m-auto"
        >
          <button
            class="btn btn-light btn-outline-secondary search-button w-75 submi"
            type="button"
            @click.prevent="SearchDomain"
          >
            Search
          </button>
        </div>

        <div class="row display-table text-center loading-visible">
          <div class="col" v-if="isLoading">
            <div class="spinner-border text-primary" role="status"></div>
          </div>
        </div>

        <div
          v-if="keywordData"
          class="table col-xl-9 col-md-12 d-flex justify-content-center m-auto"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Keyword</th>
                <th scope="col">Count</th>
                <th scope="col">Query Time</th>
                <th scope="col">Sub</th>
                <th scope="col">Balance</th>
                <th scope="col">Domains</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in keywordData.domains" :key="result">
                <td>{{ keywordData.keyword }}</td>
                <td>{{ keywordData.count }}</td>
                <td>{{ keywordData.query_time }}</td>
                <td>{{ keywordData.sub }}</td>
                <td>{{ keywordData.balance }}</td>
                <td>{{ result }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-if="keywordData"
          class="table col-xl-9 col-md-12 d-flex justify-content-center m-auto"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Keyword</th>
                <th scope="col">Count</th>
                <th scope="col">Query Time</th>
                <th scope="col">Sub</th>
                <th scope="col">Balance</th>
                <th scope="col">Domains</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in keywordData.domains" :key="result">
                <td>{{ keywordData.keyword }}</td>
                <td>{{ keywordData.count }}</td>
                <td>{{ keywordData.query_time }}</td>
                <td>{{ keywordData.sub }}</td>
                <td>{{ keywordData.balance }}</td>
                <td>{{ result }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <FooterComponetVue />
</template>


<script>
import FooterComponetVue from "@/components/FooterComponet.vue";
import HeaderComponent from "../../components/HeaderComponent.vue";
import axios from "axios";

export default {
  name: "HomeComponent",
  data() {
    return {
      domain: "",
      keywordData: null,
      dateYearNow: new Date().getFullYear(),
      isLoading: false,
    };
  },
  components: {
    HeaderComponent,
    FooterComponetVue,
  },
  methods: {
    SearchDomain() {
      this.isLoading = true;

      const config = {
        headers: {
          "X-Api-Key": "12345",
        },
      };
      axios
        .get(`https://ksdhd2a5t6.execute-api.eu-west-1.amazonaws.com/dev/keyword/amazon/${this.domain}`, config)
        .then((response) => {
          // Manipule a resposta da API conforme necessário
          this.keywordData = response.data;
          this.isLoading = false;

          console.log(this.keywordData);
        })
        .catch((error) => {
          console.error("Erro ao fazer solicitação à API:", error);
        });
    },
  },
};
</script>

<style scoped>
</style>