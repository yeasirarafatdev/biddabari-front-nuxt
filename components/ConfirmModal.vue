<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="400">
            <v-card>
                <v-card-title class="text-h5">Confirmation</v-card-title>
                <v-card-text>{{ message }}</v-card-text>
                <v-card-actions>
                    <v-btn color="error darken-1" text @click="$emit('closeDialog', true)">Disagree</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="$emit('confirm', true)">Agree</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    props:['message', 'dialog']
}
</script>
