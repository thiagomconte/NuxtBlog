<template>
    <div class="teste">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">
                <NuxtLink class="navbar-brand" to="/">Paixão Tricolor</NuxtLink>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <NuxtLink class="nav-link" to="/">
                        <i class="fa fa-home"></i>
                        <span>Home</span>
                    </NuxtLink>
                    <NuxtLink
                        v-if="!$store.state.isAuthenticated"
                        class="nav-link"
                        to="/login"
                    >
                        <i class="fa fa-sign-in" aria-hidden="true"></i>
                        Login
                    </NuxtLink>
                    <NuxtLink
                        v-if="!$store.state.isAuthenticated"
                        class="nav-link"
                        to="/register"
                    >
                        <i class="fa fa-sign-in" aria-hidden="true"></i>
                        Registrar
                    </NuxtLink>
                    <NuxtLink
                        v-if="$store.state.user.isAdmin"
                        class="nav-link"
                        to="/post/create"
                    >
                        <i class="fa fa-plus-square-o" aria-hidden="true"></i>
                        Criar postagem
                    </NuxtLink>
                    <NuxtLink
                        v-if="$store.state.isAuthenticated"
                        class="nav-link"
                        to="/profile"
                    >
                        <i class="fa fa-user" aria-hidden="true"></i>
                        Perfil
                    </NuxtLink>
                    <NuxtLink
                        v-if="$store.state.isAuthenticated"
                        class="nav-link"
                        to="/admin"
                    >
                        <i class="fa fa-lock" aria-hidden="true"></i>
                        Admin
                    </NuxtLink>
                    <a
                        @click="onLogout"
                        v-if="$store.state.isAuthenticated"
                        class="nav-link"
                        href="/"
                    >
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                        Sair
                    </a>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <NuxtLink
                        class="nav-link mr-2"
                        to="/profile"
                        v-if="$store.state.isAuthenticated"
                    >
                        Olá, {{ $store.state.user.name }}
                    </NuxtLink>
                    <b-nav-form>
                        <b-form-input
                            v-model="input"
                            class="mr-sm-2"
                            placeholder="Buscar postagem"
                        ></b-form-input>
                        <NuxtLink
                            :to="`/search/${this.input}`"
                            variant="danger"
                            class="my-2 my-sm-0 search-button-nav"
                            >BUSCAR</NuxtLink
                        >
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: "",
        };
    },
    methods: {
        async onLogout() {
            await this.$store.dispatch("logout");
        },
    },
};
</script>

<style>
.nav-link {
    font-size: 16px;
}

.nav-link i {
    font-size: 20px;
}

.navbar-brand {
    font-size: 24px;
}

.search-button-nav {
    display: block;
    width: 100px;
    height: 40px;
    background: rgb(250, 83, 83);
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    line-height: 25px;
}

.search-button-nav:hover {
    text-decoration: none;
    color: white;
    background: rgb(247, 0, 0);
}

@media (min-width: 1024px) {
    .nav-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 0.5rem;
        margin-left: 0.5rem;
    }
}
</style>