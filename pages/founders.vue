<template>
    <section class='vH-100 vW-100 max-width-'>
        <the-breadcrum :items-push="[{text: 'Founders',disabled: true,href: '/founders'}]" />

        <div class='mt-8'>
            <v-row>
                <v-col cols='12'>
                    <h3 class='mb-6 bg-yellow px-4 py-2' style='color: #09153A; border-radius: 4px;'>Founders</h3>
                </v-col>
                <v-col cols='12' v-if='$fetchState.pending'>
                    <div class='text-center my-6'>
                        <v-progress-circular
                            :size='50'
                            color='primary'
                            indeterminate
                        ></v-progress-circular>
                    </div>
                </v-col>
                <template v-else-if='$fetchState.error'>
                    <v-alert
                        border='top'
                        color='red lighten-2'
                        dark
                    >
                        {{ $fetchState.error && $fetchState.error.response && $fetchState.error.response.status == 403 ? 'Access Denied!' : $fetchState.error.message }}
                    </v-alert>
                </template>
                <template v-else>
                    <v-col v-for='founder in founders' :key='founder.id' cols='6' lg='3' md='3' sm='4'>
                        <v-card elevation='6'>
                            <div class='card-round'>
                                <v-avatar height='150' width='150' class='shadow-dark'>
                                    <v-img
                                        :lazy-src='founder.photo'
                                        max-height='250'
                                        max-width='250'
                                        :src='founder.photo'>
                                    </v-img>
                                </v-avatar>
                                <div class='mt-4'>
                                    <strong>{{ founder.name }}</strong>
                                    <div>{{ founder.designation }}</div>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                </template>
            </v-row>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            founders: []
        }
    },
    async fetch() {
        const founders = await this.$axios.get('hr?hr_type=' + 'founder')
        this.founders = founders.data
    },
    fetchOnServer: true,
    head() {
        return {
            title: 'founders',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Biddabari'
                }
            ]
        }
    },
}
</script>
