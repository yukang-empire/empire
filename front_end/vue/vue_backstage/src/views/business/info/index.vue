<template>
        <div class="business_index">
            <transition name="fade-transform" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </template>
    
    <script>
    
    export default {
        name: 'business_index',
        components: {
            
        },
        data () {
            return {
                
            }
        }
    }
    </script>
    
    <style lang='scss' scoped>
        
        @media screen and (min-width: 769px) {
            
        }
    </style>