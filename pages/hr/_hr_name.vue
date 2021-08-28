<template>
    <section class='vH-100 vW-100 max-width-'>
        <lazy-the-breadcrum :items-push="[{text: this.$route.params.hr_name,disabled: true,href: '/hrName'}]" />
        <div class='mt-8'>
            <v-row>
                <v-col cols='12'>
                    <h3 class='mb-6 bg-yellow px-4 py-2' style='color: #09153A; border-radius: 4px;'>Honourable {{ this.$route.params.hr_name }}</h3>
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
                    <v-col v-for='hr in hrs' cols='6' lg='2' md='3' sm='4' :key='hr.id'>
                        <v-card elevation='4'>
                            <div class='card-round'>
                                <v-avatar height='150' width='150' class='shadow-dark'>
                                    <v-img
                                        :lazy-src='hr.photo'
                                        max-height='250'
                                        max-width='250'
                                        :src='hr.photo'>
                                    </v-img>
                                </v-avatar>
                                <div class='mt-4'>
                                    <strong>{{ hr.name }}</strong>
                                    <div>{{ hr.designation }}</div>
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
    data: () => ({
        hrName: '',// guest, advisor, teachers, founder
        hrs: []
    }),
    async fetch() {
        const hrs = await this.$axios.get('api/hr?hr_type=' + this.$route.params.hr_name)
        this.hrs = hrs.data
    },
    fetchOnServer: true

}
</script>
