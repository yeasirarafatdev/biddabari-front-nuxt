<template>
    <div>
        <section class='vH-100 vW-100 max-width-'>

            <the-breadcrum :items-push="[{text: 'About',disabled: true,href: '/about'}]" />

            <div class='mt-10 mb-16 text-center' v-if='about && Object.keys(about).length'>
                <h2 class='font-roboto-slab'>{{ about.our_story_title }}</h2>
                <p class='text-14 text-muted mb-8'>{{ about.our_story_description }}</p>

                <div style='height: 3px; width: 60px; background-color: #49556c; margin: auto; border-radius: 10px;'></div>
            </div>

            <v-row class='my-6' v-if='dataCounts && Object.keys(dataCounts).length'>
                <v-col cols='6' lg='3' md='3' sm='3' class='text-center'>
                    <h3>1,50,000</h3>
                    <p class='text-14 text-uppercase'>Profile followers</p>
                </v-col>
                <v-col v-if='teachers.length' cols='6' lg='3' md='3' sm='3' class='text-center'>
                    <h3>{{ teachers.length }}</h3>
                    <p class='text-14 text-uppercase'>Instructors</p>
                </v-col>
                <v-col v-if='dataCounts.TotalStudentEnrolled' cols='6' lg='3' md='3' sm='3' class='text-center'>
                    <h3>{{ dataCounts.TotalStudentEnrolled }}</h3>
                    <p class='text-14 text-uppercase'>Students Enrolled</p>
                </v-col>
                <v-col v-if='dataCounts.TotalCourses' cols='6' lg='3' md='3' sm='3' class='text-center'>
                    <h3>{{ dataCounts.TotalCourses }}</h3>
                    <p class='text-14 text-uppercase'>Courses</p>
                </v-col>
            </v-row>

            <the-about-slider />

            <!--            <div class='text-center text-muted mx-auto mb-16' style='max-width: 500px; margin-top: 100px'>
                            <h1 class='mb-5'>"Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"</h1>
                            <p class='text-14 mb-4'>Nahid Ferdous, Co-Founder</p>

                            <div style='height: 3px; width: 100px; background-color: #ffbf3f; margin: auto; border-radius: 10px;'></div>
                        </div>-->

            <v-row class='mt-16' v-if='about && Object.keys(about).length'>
                <v-col cols='12' lg='6' md='6' sm='6'>
                    <div class='text-center'>
                        <img :src='about.founder_photo' alt=''
                             style='width: 180px; height: 180px; object-fit: cover; object-position: top center; border-radius: 50%'>
                        <div>{{ about.founder_name }}</div>
                        <div>{{ about.founder_designation }}</div>
                    </div>
                </v-col>
                <v-col cols='12' lg='6' md='6' sm='6'>
                    <div class='my-10'>
                        <h4 class='border-left-yellow text-uppercase py-2 px-4 mb-2'>Who we aRe</h4>
                        <p class='text-14'>{{ about.founder_message }}</p>
                    </div>
                </v-col>
            </v-row>
        </section>

        <section>
            <div class='text-center my-16'>
                <h1 class='font-roboto-slab text-uppercase'>MEET OUR TEAm</h1>
                <p class='text-14 mb-8'>An incredible group of people.</p>

                <div style='height: 3px; width: 60px; background-color: #49556c; margin: auto; border-radius: 10px;'></div>
                <v-row class='mt-8'>
                    <v-col v-for='(teacher, i) in teachers' :key='i' cols='6' lg='4' md='4' sm='4'>
                        <div slot='card' class='card-round'>
                            <v-avatar height='130' width='130'>
                                <v-img
                                    :lazy-src='teacher.photo'
                                    max-height='150'
                                    max-width='150'
                                    :src='teacher.photo'
                                ></v-img>
                            </v-avatar>
                            <div class='mt-4'>
                                <strong>{{ teacher.name }}</strong>
                                <div>{{ teacher.designation }}</div>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            teachers: [],
            dataCounts: [],
            about: {}
        }
    },
    async fetch() {
        const about = await this.$axios.get('api/about')
        this.about = about.data

        const dataCounts = await this.$axios.get('api/about-page-counters')
        this.dataCounts = dataCounts.data

        const teachers = await this.$axios.get('api/hr?hr_type=' + 'teacher')
        this.teachers = teachers.data
    },
    fetchOnServer: true,
    head() {
        return {
            title: 'About',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'March Forward is a Free Education, Coaching Training and career mentoring platform for all Bangladeshi young people.'
                }
            ]
        }
    }
}
</script>
