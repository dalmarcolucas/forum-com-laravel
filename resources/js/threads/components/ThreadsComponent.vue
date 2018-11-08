<template>
   <div class="card">
       <div class="card-content">
           <span class="card-title">{{title}}</span>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Thread</th>
                        <th>Replies</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <th>1</th>
                    <th>Topico legal que vai vir do banco</th>
                    <th>3</th>
                    <th>
                        <a href="/threads/1">open</a>
                    </th>
                </tbody>
            </table>
       </div>
   </div>
</template>

<script>
    export default {
        props: [
            'title'
        ]
    }
</script>
