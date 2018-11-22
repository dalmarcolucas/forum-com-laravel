<template>
<div>
   <div class="card">
       <div class="card-content">
           <span class="card-title">{{title}}</span>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{{ threads }}</th>
                        <th>{{ replies }}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="thread in threads_response.data" :key="thread.id" :class="{'blue lighten-4' : thread.fixed}">
                        <th>{{ thread.id }}</th>
                        <th>{{ thread.title }}</th>
                        <th>{{ thread.replies_count }}</th>
                        
                        <th>
                            <a :href="'/threads/' + thread.id" class="btn">{{ open }}</a>
                            <a :href="'/threads/pin/' + thread.id" class="btn" v-if="logged.role === 'admin'">Fixar</a>
                            <a :href="'/threads/close/' + thread.id" class="btn" v-if="logged.role === 'admin'">Fechar</a>
                        </th>
                    </tr>
                </tbody>
            </table>
       </div>
   </div>

    <div class="card">
       <div class="card-content">
           <span class="card-title">{{newThread}}</span>
        
            <form @submit.prevent="save()">
                <div class="input-field">
                    <input type="text" :placeholder="newTitle" v-model="thread_to_save.title">
                </div>
                <div class="input-field">
                    <textarea class="materialize-textarea" :placeholder="newBody" v-model="thread_to_save.body"></textarea>
                </div>
                <button type="submit" class="btn red accent-2">{{send}}</button>
            </form>
       </div>
   </div>
   

</div>
</template>

<script>
    export default {
        props: [
            'title',
            'threads',
            'replies',
            'open',
            'newThread',
            'newTitle',
            'newBody',
            'send'
        ],
        data() {
            return {
                threads_response: [],
                logged: window.user || {},
                thread_to_save: {
                    title : '',
                    body : ''
                }
            }
        },
        methods: {
            save() {
                window.axios.post('/threads', this.thread_to_save).then(() => {
                    this.getThreads()

              });
            },
            getThreads() {
                window.axios.get('/threads').then((response) => {
                    this.threads_response = response.data
              })
            },
        },
        mounted() {
             this.getThreads()

             Echo.channel('new.threads')
                .listen('NewThread', (e) => {
                   if(e.thread){
                       this.threads_response.data.splice(0, 0, e.thread);
                   }
                });
        }
    }
</script>
