<template>
    <div>
        <div class='mb-4'>
            <div class='bg-yellow text-center mb-4 py-2'><strong>Exam Instructions</strong></div>
            <div class='d-flex flex-wrap justify-space-around align-center gap-10 text-center text-14'>
                <div>
                    <img :src='require("~/assets/images/exam-rules/examinatio.PNG")' alt='' height='80px'>
                    <div class='d-flex align-center'>
                        <div class='bullet mr-2'>1</div>Paper Exam
                    </div>
                </div>
                <div>
                    <img :src='require("~/assets/images/exam-rules/take-photo.PNG")' alt='' height='80px'>
                    <div class='d-flex align-center'>
                        <div class='bullet mr-2'>2</div>Take photo
                    </div>
                </div>
                <div>
                    <img :src='require("~/assets/images/exam-rules/upload-photo.PNG")' alt='' height='80px'>
                    <div class='d-flex align-center'>
                        <div class='bullet mr-2'>3</div>Upload photo
                    </div>
                </div>
            </div>
        </div>
        <div class='text-center text-14 mb-2'>
            Don't forget to click the <strong class='orange--text'>"Exam Complete"</strong> button once the exam is complete.
        </div>
        <v-divider></v-divider>
    </div>
</template>
