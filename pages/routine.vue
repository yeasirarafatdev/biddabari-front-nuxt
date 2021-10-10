<template>
    <section class='vH-100 vW-100 mt-16 max-width-'>

        <the-breadcrum :items-push="[{text: 'Routine',disabled: true,href: '/routine'}]" />

        <v-expansion-panels>
            <v-expansion-panel
                v-for='routine in routines'
                :key='routine.id'
            >
                <v-expansion-panel-header>
                    {{ routine.title }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <img :src='routine.photo' :alt='routine.name' style='width: 100%'>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </section>
</template>

<script>
export default {
    data() {
        return {
            routines: []
        }
    },
    async fetch() {
        const routinesUrl = 'routines'
        this.routines = await this.$axios.$get(routinesUrl)
    },
    fetchOnServer: true,
    head() {
        return {
            title: 'Routine',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'March Forward daily routine.'
                }
            ]
        }
    },
}
</script>
