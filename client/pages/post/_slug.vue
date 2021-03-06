<template>
    <div class="container container-post">
        <!-- Post area -->
        <h1 class="h1-post">{{ post.title }}</h1>
        <hr />
        <div class="head">
            <span class="span-post pull-left mt-2">
                <i class="fa fa-calendar mr-2"></i
                >{{ formatDate(post.createdAt) }} </span
            ><br /><br />
            <h5>{{ post.description }}</h5>
        </div>

        <hr />
        <img class="img-post" :src="post.img" />
        <span class="span-post imgOwner"> Autor: {{ post.imgOwner }}</span>
        <p class="content" v-html="post.content"></p>
        <hr />
        <div v-if="$store.state.isAuthenticated" class="separator">
            <p>Deixe um comentário!</p>
            <b-form-textarea
                id="textarea-rows-comment"
                placeholder="Comente aqui"
                rows="5"
                v-model="content"
            ></b-form-textarea>
            <button @click="onComment" class="button-post">
                Comentar <i class="fa fa-comments" aria-hidden="true"></i>
            </button>
        </div>
        <h4 class="info-comment" v-else>
            Para participar dos comentários, você precisa criar uma
            <NuxtLink to="/register">conta.</NuxtLink>
        </h4>
        <h5>Comentários ({{ numOfComments }}):</h5>
        <div
            class="card mb-3"
            v-for="(comment, index) in comments.slice(0, showComments)"
            :key="comment._id"
        >
            <h4 v-if="comment.user_id.isAdmin" class="mb-3">
                <i class="fa fa-check-square" aria-hidden="true"></i>
                {{ comment.user_id.name }}:
            </h4>
            <h3 v-else class="mb-3">{{ comment.user_id.name }}:</h3>
            <p class="comment">{{ comment.content }}</p>
            <a
                href="#"
                @click.prevent="onDeleteComment(comment._id, index)"
                v-if="$store.state.user.isAdmin"
                ><i class="fa fa-trash" aria-hidden="true"></i>
            </a>
        </div>
        <button
            @click.prevent="loadComments"
            v-if="showComments < numOfComments"
            class="load-comments"
        >
            Carregar mais comentários
        </button>
    </div>
</template>

<script>
import moment from "moment";
export default {
    async asyncData({ $axios, route }) {
        try {
            let response = await $axios.$get(`/post/getpost/${route.query.slug}`);
            return {
                post: response.post,
                comments: response.comments,
                numOfComments: response.numOfComments,
            };
        } catch (err) {
            console.log(err);
        }
    },
    data() {
        return {
            content: "",
            comments: [{}],
            numOfComments: 0,
            showComments: 5,
            confirm: "",
        };
    },
    methods: {
        formatDate(date) {
            moment.locale("pt-br");
            return moment(date).format("Do MMMM YY");
        },
        async onComment() {
            try {
                let response = await this.$axios.$post("/comment/add", {
                    content: this.content,
                    post_id: this.post._id,
                });

                this.comments.unshift({
                    content: this.content,
                    user_id: {
                        name: this.$store.state.user.name,
                        isAdmin: this.$store.state.user.isAdmin,
                    },
                    _id: response.comment_id,
                });
                this.content = "";
                this.numOfComments++;
                this.$bvToast.toast("Comentário adicionado", {
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
        async onDeleteComment(id, index) {
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
                        `/comment/delete/${id}`
                    );
                    if (response.success) {
                        this.comments.splice(index, 1);
                        this.numOfComments--;
                    }
                    this.$bvToast.toast("Comentário removida", {
                        title: "Sucesso",
                        autoHideDelay: 3000,
                        variant: "success",
                        toaster: "b-toaster-top-center",
                        solid: true,
                    });
                }
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
        loadComments() {
            this.showComments += this.showComments;
        },
    },
};
</script>

<style>
.container-post {
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding: 1rem;
    border-radius: 0.3rem;
    background: rgba(221, 221, 221, 0.3);
}

.h1-post {
    color: red;
    font-size: 60px;
}

.info-comment {
    padding: 1rem 0;
}

.img-post {
    max-width: 550px;
}

.head {
    padding: 0 1rem;
}

.span-post {
    color: rgba(0, 0, 0, 0.5);
}

.imgOwner {
    text-align: center;
    display: block;
    margin: 0 auto;
}

hr {
    border: 0;
    width: 100%;
    background-color: #3a3a3a;
    height: 1px;
}

img {
    width: 80%;
    text-align: center;
    display: block;
    margin: 0 auto;
}

.content {
    white-space: pre-wrap;
    margin-bottom: 3rem;
    margin-top: 3rem;
    padding: 0 1rem;
}

.button-post {
    display: block;
    width: 135px;
    height: 45px;
    background: rgb(253, 36, 36);
    text-align: center;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    line-height: 25px;
    border: none;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.button-post:hover {
    text-decoration: none;
    color: white;
    background: rgb(247, 0, 0);
}

.buton-post:focus,
.buton-post:active {
    border: none;
    outline: none;
}

.load-comments {
    border: none;
    outline: none;
    height: 3rem;
    background: rgb(253, 32, 32);
    border-radius: 0.3rem;
}

.card {
    padding: 1rem;
}

.comment {
    white-space: pre-wrap;
}

#textarea-rows-comment {
    background: transparent;
    border-radius: 0.3rem;
    border: 0.3px solid rgb(158, 158, 158);
    margin-top: 3rem;
    padding: 0 1rem;
    font-size: 1.3rem;
    transition: 0.2s;
}

#textarea-rows-comment:focus {
    outline: none;
    border: 1px solid rgb(138, 138, 138);
    box-shadow: 0 0 0 0;
}

@media (max-width: 800px) {
    .h1-post {
        font-size: 40px;
    }
}
</style>