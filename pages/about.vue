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
        <section class='vW-100 mt-16 max-width-'>
            <v-card>
                <v-card-text class="mt-2">
                    <h2 class="mb-2">দীর্ঘ একাডেমিক পড়ালেখা শেষ করে চাকুরী নিয়োগ পরীক্ষায় অংশ নিতে একজন প্রার্থীর যে সমস্যাগুলি হয় তার মধ্যে অন্যতম হচ্ছে –</h2>

                    <p>ক) কোথা থেকে শুরু করতে হবে, কী পড়তে হবে, কোথা থেকে পড়তে হবে।</p>
                    <p>খ) কোন বইগুলি দিয়ে পড়া শুরু করতে হবে।</p>
                    <p>গ) অনেক পড়েও কিছুই মনে থাকে না।</p>
                    <p>ঘ) ইংরেজি, গণিত এর পাশাপাশি অন্যান্য কঠিন বিষয়গুলি থেকে কীভাবে প্রস্তুতি নেয়া সহজ হবে। এ ধরনের নানাবিধ সমস্যা বা প্রশ্ন মাথায় নিয়ে একজন নতুন চাকরি প্রত্যাশী প্রার্থী ভাবনায় থাকে।
                        "বিদ্দাবাড়ী" প্রতিষ্ঠানটি পরিচালিত হয় দীর্ঘ অভীজ্ঞ একজন বিসিএস ক্যাডার কর্মকর্তার মস্তিস্ক নিঃসৃত নির্দেশনা ও গাইড লাইনের মাধ্যমে।
                    </p>
                    <p>এখানে যে সকল শিক্ষক মণ্ডলী ক্লাস নেন তাঁরা সবাই দীর্ঘ অভীজ্ঞ ও সমৃদ্ধ জ্ঞাণের অধিকারী। বিদ্যাবাড়ীতে কেবল লেকচার ক্লাস বা নিয়মিত পরীক্ষাই নেয়া হয় না, এখানে একজন নতুন চাকুরী প্রত্যাশী প্রার্থীর প্রস্তুতি কীভাবে নিতে হবে , কত ঘন্টা পড়তে হবে , কী কী বই পড়তে হবে এইগুলোও ঠিক করে দেয়া হয়। এর পাশাপাশি একজন অভিভাবকের মতো করেই বিদ্যাবাড়ি টীম প্রতিটি শিক্ষার্থীকে প্রতি সপ্তাহে বাড়িতে পড়ার জন্য হোম এসাইনমেন্ট দিয়ে থাকে এবং নিয়মিত লেকচার ক্লাস এর পাশাপাশি সেই এসাইন্টমেন্ট এর উপর পরীক্ষা নিয়ে একজন নতুন অনভিজ্ঞ শিক্ষার্থীকে চৌকস করে তোলার কাজ করে থাকে।</p>
                    <p>মাত্র কয়েক মাসের মধ্যেই বিদ্যাবাড়ির প্রতিটি শিক্ষার্থী খুব দ্রুতই আগের থেকে অনেক বেশি সমৃদ্ধ মনে করে থাকে।</p>
                    <p>বিসিএস বা যেকোন জব পরীক্ষায় শুরু থেকে ভাল করতে বিদ্যাবাড়ি এক অনন্য ব্যতিক্রম প্রতিষ্ঠান। সুযোগ থাকলে বিদ্যাবাড়ির যেকোন একটি কোর্স করার আমন্ত্রণ রইল।
                    </p>
                    <p><strong>Delivery Time:</strong> Within 24 hours Delivery Time</p>

                    <p><strong>Trade License Number:</strong> TRAD/DSCC/036915/2021</p>
                    <p><strong>TIN Certificate Number:</strong> 739055588670</p>
                </v-card-text>
            </v-card>
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
        const about = await this.$axios.get('about')
        this.about = about.data

        const dataCounts = await this.$axios.get('about-page-counters')
        this.dataCounts = dataCounts.data

        const teachers = await this.$axios.get('hr?hr_type=' + 'teacher')
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
