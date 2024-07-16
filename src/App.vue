<script setup></script>
<template>
    <router-view></router-view>
</template>

<style>
    #app{
        display: flex;
        flex-direction: column;
    }

    @media (min-width: 768px) {
        #app{
            flex-direction: row;
        }
    }
</style>
