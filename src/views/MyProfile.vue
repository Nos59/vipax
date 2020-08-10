<template>
  <div class="profile">
      <div class="profile-block">
          <b-img v-bind="imgProps" alt="" :src="profile.avatar_url"/>
          <div class="profile-block__info">
          <a :href="profile.html_url">{{ profile.login }}</a>
          <p>Дата создания аккаунта: {{ profile.created_at | formatDate }}</p>
          </div>
      </div>

      <div class="shadow-lg rounded">
          <b-table head-variant="light" bordered :items="repos" :fields="headers">
              <template v-slot:cell(clone_url)="data">
                  <a :href=data.item.clone_url>{{ data.item.clone_url }}</a>
              </template>
              <template v-slot:cell(created_at)="data">
                  {{ data.item.created_at | formatDate }}
              </template>
          </b-table>
      </div>

      <div class="following-block shadow-lg rounded">
          <h1 class="following-block__title">Подписки</h1>
          <div class="following-block__cards" v-for="item in following" :key="item.id">
              <a :href="item.html_url">{{item.login}}</a>
              <b-img v-bind="imgProps" :src="item.avatar_url"/>
          </div>
      </div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'MyProfile',

    data() {
        return {
            imgProps: {
                rounded: 'circle',
                height: 150,
                width: 150,
            },
            headers: [
                {
                    key:'name',
                    label: 'Название репозитория'
                },
                {
                    key:'description',
                    label: 'Описание'
                },
                {
                    key:'language',
                    label: 'Язык программирования'
                },
                {
                    key:'created_at',
                    label: 'Дата создания'
                },
                {
                    key:'clone_url',
                    label: 'Ссылка на клонирование репозитория'
                }
            ]
        }
    },

    filters: {
        formatDate: value => value.substr(0,10)
    },

    computed: {
        ...mapState('myProfile', [
            'profile',
            'repos',
            'following'
        ])
    },

    created() {
        this.initialState()
    },

    methods: {
        initialState() {
            this.$store.dispatch('myProfile/fetchProfile')
        }
    }
}
</script>

<style lang="scss">

    .profile {
        width: 1000px;
        margin: auto;

        @media screen and (max-width: 768px) {
            .table {
                td {
                    padding: 5px
                }
                th {
                    padding: 5px
                }
            }
            font-size: 11px;
            width: 768px;
        }

        @media screen and (max-width: 480px) {
            width: 480px;
            font-size: 9px;
            .table {
                td {
                    padding: 3px
                }
                th {
                    padding: 3px
                }
            }
        }

        @media screen and (max-width: 320px) {
            width: 320px;
            font-size: 6.4px;
            .table {
                td {
                    padding: 0
                }
                th {
                    padding: 0
                }
            }
        }

    }

    .profile-block {
        display: flex;
        justify-content: center;
        margin: 10px 0 70px 0;
        flex-wrap: wrap;

        &__info {
            display: flex;
            justify-content: center;
            flex-direction: column;
            padding: 0 20px;

            a {
                font-size: 30px;
                font-family: "Neon Lights"
            }
        }
    }

    .following-block {
        display: flex;
        margin: 60px 0;
        flex-wrap: wrap;
        width: inherit;

        justify-content: center;
        &__title {
            width: inherit;
            margin-top: 10px;
        }
        &__cards {
            display: flex;
            margin: 10px;
            flex-direction: column;
        }
    }

</style>
