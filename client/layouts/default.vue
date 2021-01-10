<template>
    <div>
        <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-vue/2.21.2/bootstrap-vue.min.js" integrity="sha512-Z0dNfC81uEXC2iTTXtE0rM18I3ATkwn1m8Lxe0onw/uPEEkCmVZd+H8GTeYGkAZv50yvoSR5N3hoy/Do2hNSkw==" crossorigin="anonymous"></script>
        <NavBar></NavBar>
        <Nuxt />
    </div>
</template>

<script>
import NavBar from "~/components/NavBar.vue";
export default {};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto:wght@500&display=swap');
p,
li,
ul,
textarea,
label,
input {
    font-family: 'Open Sans', sans-serif;
}

h1 {
    font-family: "Raleway", sans-serif;
}

body {
    background-color: rgba(221, 221, 221, 0.3);
}
</style>
