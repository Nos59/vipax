<template>
  <div class="my-team">
      <b-list-group class="my-team__user-list">
          <h1>Моя команда</h1>
          <b-button-group size="sm">
              <b-button variant="outline-primary" @click="sortUser">по возрастанию</b-button>
              <b-button variant="outline-primary" @click="sortUser(false)">по убыванию</b-button>
          </b-button-group>
          <b-list-group-item v-for="item in team" class="my-team__user-card">
              <b-avatar :src="item.avatar_url"/>
              <a :href="item.html_url">{{item.login}}</a>
              <b-button variant="danger" @click="deleteUser(item)">Удалить</b-button>
          </b-list-group-item>
      </b-list-group>
      <b-list-group class="my-team__user-list">
          <h1>Пользователи</h1>
          <b-form-input v-model="searchText" placeholder="Введите логин"></b-form-input>
          <b-list-group-item v-for="item in users" class="my-team__user-card">
              <b-avatar :src="item.avatar_url"/>
              <a :href="item.html_url">{{item.login}}</a>
              <b-button variant="success" @click="addUser(item)">Добавить</b-button>
          </b-list-group-item>
      </b-list-group>
  </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: 'MyTeam',

        data() {
            return {
                team: [],
                users: [],
                searchText: ""
            }
        },
        computed: {
            ...mapState('myTeam', [
                    'usersList'
                ]
            )
        },

        created() {
            this.initialState()
        },

        watch: {
            searchText: function() {
                this.users = this.usersList
                this.users = this.users.filter(item => item.login.indexOf(this.searchText) !== -1)
            }
        },

        methods: {
            async initialState() {
                await this.$store.dispatch('myTeam/fetchUsersList')
                this.users = this.usersList
            },

            addUser(user){
                this.team.push(user)
                this.users = this.users.filter(item => item !== user)
            },

            deleteUser(user) {
                this.users.push(user)
                this.team = this.team.filter(item => item !== user)
            },

            sortUser(inc = true) {
                this.team = this.team.sort((a,b) => {
                    if (inc) {
                        return a.login.length - b.login.length
                    } else {
                        return b.login.length - a.login.length
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .my-team {
        display: flex;
        margin: 50px auto;
        justify-content: center;
        width: 1000px;

        &__user-list {
            display: flex;
            width: 400px;
            &:nth-child(2n) {
                margin-left: 150px;
            }
        }

        &__user-card {
            display: flex !important;
            justify-content: space-between;
            align-items: center;
        }

        @media screen and (max-width: 768px) {
            width: 768px;
            &__user-list {
                width: 350px;
                &:nth-child(2n) {
                    margin-left: 50px;
                }
            }
        }
        @media screen and (max-width: 480px) {
            width: 480px;
            flex-direction: column;
            margin: 20px auto;
            &__user-list {
                width: 400px;
                margin: auto;
                &:nth-child(2n) {
                    margin: 40px auto;
                }
            }
        }
        @media screen and (max-width: 320px) {
            width: 320px;
            flex-direction: column;
            margin: auto;
            &__user-list {
                width: 300px;
                margin: auto;
                &:nth-child(2n) {
                    margin: 40px auto;
                }
            }
        }
    }
</style>