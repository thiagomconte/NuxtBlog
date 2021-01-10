<template>
    <div class="container">
        <div
            class="row mt-5 mb-5 container-index"
            v-for="(post, index) in posts"
            :key="post._id"
        >
            <div class="col-lg-3">
                <NuxtLink :to="`/post/${post.slug}`">
                    <img
                        class="img-responsive postImg mt-auto"
                        :src="post.img"
                    />
                </NuxtLink>
            </div>
            <div class="col-lg-9">
                <h3 class="h3-index mt-2 mt-auto">{{ post.title }}</h3>
                <p>{{ post.description }}</p>
                <ul class="list-unstyled list-inline media-detail pull-left">
                    <li class="li-index">
                        <i class="fa fa-calendar"></i
                        >{{ formatDate(post.createdAt) }}
                    </li>
                </ul>
                <NuxtLink
                    :to="`/post/${post.slug}`"
                    class="list-unstyled list-inline media-detail pull-right button-index ml-1"
                    >LEIA MAIS</NuxtLink
                >
                <NuxtLink
                    v-if="$store.state.user.isAdmin"
                    :to="`/post/update/${post.slug}`"
                    class="operation"
                    ><i class="fa fa-refresh" aria-hidden="true"></i>
                </NuxtLink>
                <a
                    v-if="$store.state.user.isAdmin"
                    href="#"
                    class="operation"
                    @click.prevent="onDeletePost(post._id, index)"
                    ><i class="fa fa-trash" aria-hidden="true"></i>
                </a>
            </div>
            <hr class="hr-index" />
        </div>
        <b-pagination-nav
            pills
            size="sm"
            :link-gen="linkGen"
            :number-of-pages="totalPages"
            v-model="currentPage"
            align="center"
            use-router
            v-if="totalPages >= 1"
        ></b-pagination-nav>
    </div>
</template>

<script>
import moment from "moment";
export default {
    async asyncData({ $axios, params }) {
        try {
            let response = await $axios.$get(`/post/${params.page}`);
            return {
                posts: response.posts,
                tam: response.tam,
                totalPages: Math.ceil(response.tam / 5),
                currentPage: params.page,
            };
        } catch (err) {
            console.log(err);
        }
    },
    data() {
        return {
            posts: [{}],
            tam: 0,
            totalPages: 0,
            confirm: ""
        };
    },
    methods: {
        formatDate(date) {
            moment.locale("pt-br");
            return moment(date, "YYYYMMDD").fromNow();
        },
        linkGen(pageNum) {
            return `/${pageNum}`;
        },
        async onDeletePost(id, index) {
            try {
                await this.$bvModal
                    .msgBoxConfirm("Tem certeza?", {
                        okTitle: "Sim",
                        cancelTitle: "Cancelar",
                        okVariant: "danger",
                    })
                    .then((value) => {
                        this.confirm = value;
                    })
                    .catch((err) => {
                        this.$bvToast.toast("Tente novamente", {
                            title: "Erro",
                            autoHideDelay: 3000,
                            variant: "danger",
                            toaster: "b-toaster-top-center",
                            solid: true,
                        });
                    });

                if (this.confirm) {
                    let response = await this.$axios.$delete(
                        `/post/delete/${id}`
                    );
                    if (response.success) {
                        this.posts.splice(index, 1);
                    }
                    this.$bvToast.toast("Postagem removida", {
                        title: "Sucesso",
                        autoHideDelay: 5000,
                        variant: "success",
                        toaster: "b-toaster-top-center",
                        solid: true,
                    });
                }
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
    },
};
</script>


<style>
.container-index {
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding: 1rem;
    border-radius: 0.3rem;
    background: rgba(221, 221, 221, 0.3);
}

.img-responsive {
    display: block;
    margin-top: 20px;
    width: 100%;
    max-width: 270px;
    max-height: 200px;
}

.operation {
    text-align: center;
    display: block;
    margin: 0 auto;
    color: red;
    width: 10px;
}

.h3-index {
    color: red;
}

.li-index {
    color: rgba(0, 0, 0, 0.5);
}

.li-index i {
    margin-right: 10px;
}

.hr-index {
    border: 0;
    clear: both;
    display: block;
    width: 95%;
    background-color: #3a3a3a;
    height: 1px;
    margin: 1rem auto;
}

.button-index {
    display: block;
    width: 115px;
    height: 45px;
    background: rgb(250, 83, 83);
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    line-height: 25px;
}

.button-index:hover {
    text-decoration: none;
    color: white;
    background: rgb(247, 0, 0);
}

.pagination li {
    padding: 0.3rem;
}

.pagination li a {
    color: black;
    padding: 1rem 1rem;
    font-size: 1.2rem;
    border-radius: 1rem;
}

.pagination > li.active > a {
    border: 2px solid rgb(253, 59, 59) !important;
    background: white !important;
    outline: none;
    color: black !important;
}

.pagination > li > a:focus {
    background: rgb(253, 59, 59) !important;
    outline: none;
    box-shadow: none;
}

@media (max-width: 900px) {
    .img-responsive {
        text-align: center;
        display: block;
        margin: 0 auto;
    }
}
</style>
