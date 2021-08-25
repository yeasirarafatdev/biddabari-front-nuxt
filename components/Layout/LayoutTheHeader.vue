<template>
   <header id='header'>
       <!--       <layout-top-bar />-->
       <layout-navigation-bar :links='links'/>
   </header>
</template>

<script>
export default {
    props: {
        // eslint-disable-next-line vue/require-default-prop
        links: {
            type: Array,
            default: () => [],
            required: true
        }
    },
    data() {
        return {

        }
    }
}
</script>
