<template>
    <v-breadcrumbs :items='items'></v-breadcrumbs>
</template>

<script>
export default {
    props: {
        itemsPush: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            items: [
                {
                    text: 'Home',
                    disabled: false,
                    href: '/'
                }
            ]
        }
    },
    mounted() {
        this.getRoute()
    },
    methods: {
        getRoute() {
            // this.items.concat(this.itemsPush)
            this.items = Array.from(new Set(this.items.concat(this.itemsPush)))
        }
    }
}
</script>
