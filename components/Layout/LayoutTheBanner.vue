<template>
        <div class='banner-image'>
            <img :src='imageUrl' alt='Banner'>
        </div>
</template>

<script>
export default {
    props: {
        imageUrl: {
            type: String,
            required: true
        },
    }
}
</script>
