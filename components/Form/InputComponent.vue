<template>
    <div class="custom-text-input">
        <label :for="id">{{ label }}</label>
        <textarea v-if="type==='text-area'"
                  :id="id"
                  :placeholder="placeholder"
                  :name="name"
                  ref="input"
                  :disabled="disabled"
                  :hidden="hidden"
                  class="text-area"
                  :rows="rows"
                  @input="$emit('input', $event.target.value.trim())"></textarea>
        <input
            v-else
            @input="$emit('input', $event.target.value.trim())"
            :type="type"
            :id="id"
            :placeholder="placeholder"
            :value="value"
            :name="name"
            ref="input"
            :disabled="disabled"
            :hidden="hidden"/>

        <p v-if="!!error">{{ error }}</p>
    </div>
</template>

<script>
export default {
    name: "InputComponent",
    props: {
        type: {
            type: String,
            required: true,
            /*validator(value) {
                return ['text', 'email', 'password', 'date'].includes(value);
            },*/
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        rows: {
            type: Number,
            default: 6,
        },
        hidden: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            required: true,
        },
        error: {
            type: [String, Array, Object],
        },
        displayErrorMsg: {
            type: String,
            default: "true",
        },
        id: String,
        name: String,
        label: String,
        placeholder: {
            type: String,
            default: "",
        },
    },
};
</script>

<style scoped lang="scss">
.text-area {
    border: 2px solid #adadad;
    width: 100%;
    padding: 4px 10px;
    border-radius: 6px;

    &:focus {
        outline: 0;
        border: 2px solid #189aff;
    }
}

.custom-text-input {
    color: #1d2124;

    label {
        font-size: 14px;
    }

    input {
        border: 2px solid #adadad;
        width: 100%;
        padding: 4px 10px;
        border-radius: 6px;

        &:focus {
            outline: 0;
            border: 2px solid #189aff;
        }
    }

    p {
        color: #ff3636;
        font-size: 14px;
    }
}
</style>
