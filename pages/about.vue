<template>
    <div>
        <section class='vH-100 vW-100 max-width-'>

            <the-breadcrum :items-push="[{text: 'About',disabled: true,href: '/about'}]" />

            <div class='mt-10 mb-16 text-center'>
                <h2 class='font-roboto-slab'>OUR STORY</h2>
                <p class='text-14 text-muted mb-8'>It is a charity organization</p>

                <div style='height: 3px; width: 60px; background-color: #49556c; margin: auto; border-radius: 10px;'></div>
            </div>

            <v-row class='my-6'>
                <v-col cols='6' lg='3' md='3' sm='3' class='text-center'>
                    <h3>1,50,000</h3>
                    <p class='text-14 text-uppercase'>Profile followers</p>
                </v-col>
                <v-col cols='6' lg='3' md='3' sm='3' class='text-center'>
                    <h3>70</h3>
                    <p class='text-14 text-uppercase'>Instructors</p>
                </v-col>
                <v-col cols='6' lg='3' md='3' sm='3' class='text-center'>
                    <h3>80</h3>
                    <p class='text-14 text-uppercase'>Students Enrolled</p>
                </v-col>
                <v-col cols='6' lg='3' md='3' sm='3' class='text-center'>
                    <h3>50</h3>
                    <p class='text-14 text-uppercase'>Courses</p>
                </v-col>
            </v-row>

            <the-about-slider />

            <!--            <div class='text-center text-muted mx-auto mb-16' style='max-width: 500px; margin-top: 100px'>
                            <h1 class='mb-5'>"Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"</h1>
                            <p class='text-14 mb-4'>Nahid Ferdous, Co-Founder</p>

                            <div style='height: 3px; width: 100px; background-color: #ffbf3f; margin: auto; border-radius: 10px;'></div>
                        </div>-->

            <v-row class='mt-16'>
                <v-col cols='12' lg='6' md='6' sm='6'>
                    <h4 class='border-left-yellow text-uppercase py-2 px-4 mb-2'>Who we aRe</h4>
                    <p class='text-14'>Who we are: 'March Forward is a Free Education, Coaching Training and career mentoring platform for all Bangladeshi young people.</p>
                </v-col>
                <v-col cols='12' lg='6' md='6' sm='6'>
                    <h4 class='border-left-yellow text-uppercase py-2 px-4 mb-2'>WhAt we dO</h4>
                    <p class='text-14'>We want sincere and honest Civil Servants in Bangladesh. Dedicated and smart corporate professionals are also in our Agenda. We will also work for English and other language proficiency as a means communication for our young people. Supporting New Entrepreneurs is also one of our concerns. We do not want just successful careerists but righteous people. We want to ensure level playing field of quality education, consultancy and training for the students all over the country specially who live in remote areas. Now only the students of mega cities are getting these privileges, we want to break this monopoly of education and training. Our slogan is "Let us Spread Kindness".</p>
                </v-col>
            </v-row>
        </section>

        <div style='height: 300px; width: 100%; background-repeat: no-repeat; background-origin: border-box; background-position: center;background-size:cover;'
             :style="{ backgroundImage: `url(${require('~/assets/images/about-bg.jpg')})`}"></div>

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
