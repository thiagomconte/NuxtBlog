<template>
    <div>
        <b-table-simple hover small caption-top responsive>
            <caption>
                Total de usuários: <b>{{users.length}}</b>
            </caption>
            <b-thead head-variant="dark">
                <b-tr>
                    <b-th>Nome</b-th>
                    <b-th>email</b-th>
                    <b-th>Permissão</b-th>
                    <b-th>Ações</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="(user, index) in users" :key="user._id">
                    <b-td>{{ user.name }}</b-td>
                    <b-td>{{ user.email }}</b-td>
                    <b-td>
                        <p v-if="user.isAdmin">Administrator</p>
                        <p v-else>Usuário</p>
                    </b-td>
                    <b-td>
                        <a
                            v-if="user.isAdmin"
                            href="#"
                            class="actions"
                            @click.prevent="onUpdateUser(user._id, index)"
                            >Rebaixar</a
                        >
                        <a
                            v-else
                            href="#"
                            class="actions"
                            @click.prevent="onUpdateUser(user._id, index)"
                            >Promover</a
                        >
                        <a
                            href="#"
                            class="actions"
                            @click.prevent="onDeleteUser(user._id, index)"
                            >/ Deletar</a
                        >
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
</template>

<script>
export default {
    middleware: "redirectIfNoAdmin",
    async asyncData({ $axios }) {
        try {
            let response = await $axios.$get("/user/users");
            return {
                users: response.users,
            };
        } catch (err) {
            this.$bvToast.toast(err.response.data.message, {
                title: "Erro",
                autoHideDelay: 5000,
                variant: "danger",
                toaster: "b-toaster-top-center",
                solid: true,
            });
        }
    },
    data() {
        return {
            users: [
                {
                    name: "",
                    email: "",
                    isAdmin: false,
                },
            ],
        };
    },
    methods: {
        async onUpdateUser(id, index) {
            try {
                let response = await this.$axios.$put(`/admin/update/${id}`);
                this.users[index].isAdmin = !this.users[index].isAdmin;
                this.$bvToast.toast(response.message, {
                    title: "Sucesso",
                    autoHideDelay: 3000,
                    variant: "success",
                    toaster: "b-toaster-top-center",
                    solid: true,
                });
            } catch (err) {
                this.$bvToast.toast(err.response.data.message, {
                    title: "Erro",
                    autoHideDelay: 3000,
                    variant: "danger",
                    toaster: "b-toaster-top-center",
                    solid: true,
                });
            }
        },
        async onDeleteUser(id, index) {
            try {
                let response = await this.$axios.$delete(`/admin/delete/${id}`);
                this.users.splice(index, 1);
                this.$bvToast.toast(response.message, {
                    title: "Sucesso",
                    autoHideDelay: 3000,
                    variant: "success",
                    toaster: "b-toaster-top-center",
                    solid: true,
                });
            } catch (err) {
                this.$bvToast.toast(err.response.data.message, {
                    title: "Erro",
                    autoHideDelay: 3000,
                    variant: "danger",
                    toaster: "b-toaster-top-center",
                    solid: true,
                });
            }
        },
    },
};
</script>

<style>
.actions{
    color: rgb(250, 104, 104);
}

.actions:hover{
    color: rgb(255, 0, 0);
    text-decoration: none;
}
</style>