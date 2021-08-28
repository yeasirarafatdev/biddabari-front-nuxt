<template>
    <section class='vH-100 vW-100 max-width-'>
        <the-breadcrum :items-push="[{text: 'Teachers',disabled: true,href: '/teachers'}]" />

        <div class='mt-8'>
            <v-row>
                <v-col cols='12'>
                    <h3 class='mb-6 bg-yellow px-4 py-2' style='color: #09153A; border-radius: 4px;'>Honourable Teachers</h3>
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
                    <v-col v-for='teacher in teachers' :key='teacher.id' cols='6' lg='3' md='3' sm='4'>
                        <v-card elevation='6'>
                            <div class='card-round'>
                                <v-avatar height='150' width='150' class='shadow-dark'>
                                    <v-img
                                        :lazy-src='teacher.photo'
                                        max-height='250'
                                        max-width='250'
                                        :src='teacher.photo'>
                                    </v-img>
                                </v-avatar>
                                <div class='mt-4'>
                                    <strong>{{ teacher.name }}</strong>
                                    <div>{{ teacher.designation }}</div>
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
            teachers: []
        }
    },
    async fetch() {
        const teachers = await this.$axios.get('api/hr?hr_type=' + 'teacher')
        this.teachers = teachers.data
    },
    fetchOnServer: true,
    head() {
        return {
            title: 'Teachers',
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
