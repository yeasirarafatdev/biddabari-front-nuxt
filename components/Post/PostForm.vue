<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="openModal" persistent max-width="1000px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Create Post</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form>
                                <v-row>
                                    <v-col cols="12">
                                        <InputComponent
                                            v-model="postForm.description"
                                            :disabled="uploadingPost"
                                            type="text-area"
                                            label="POST:"
                                            id="description"
                                            placeholder="What's in your mind?"
                                            :error="errors.description && Array.isArray(errors.description) ? errors.description[0] : errors.description"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-autocomplete
                                            v-model="postForm.tagsId"
                                            :disabled="uploadingPost"
                                            color="blue-grey lighten-2"
                                            dense
                                            filled
                                            rounded
                                            :items="tags"
                                            item-text="name"
                                            chips
                                            item-value="id"
                                            label="Select Tag" multiple
                                            small-chips>
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <div>
                                            <label @click="handleComboBoxClick()" style="font-size: 14px;"></label>
                                            <div class="comboBoxComponent" @click="handleComboBoxClick()" tabindex="-1" @blur="CBOclicked = false">
                                                <div class="placeholders">
                                                    <!--<div v-if="postForm.categoriesId.length">{{ postForm.categoriesId }}</div>-->
                                                    <div v-if="postForm.categoriesId.length && selectedCategories.length">
                                                        <v-chip v-for="category in selectedCategories" :key="'selected'+category" color="orange"
                                                                small class="ma-1">
                                                            {{ category }}
                                                        </v-chip>
                                                    </div>
                                                    <div v-else>Select Category</div>
                                                </div>
                                                <template v-if="CBOclicked">
                                                    <div class="dropdownComboBox">
                                                        <ComboBox
                                                            :options="categories"
                                                            displayProperty="name"
                                                            valueProperty="id"
                                                            placeholder="Select category"
                                                            :selectedOptions="postForm.categoriesId"
                                                            @nodeClicked="updateSelectedCategoryValue($event)"
                                                            :disabled="uploadingPost"
                                                        />
                                                    </div>
                                                </template>
                                            </div>
                                            <p class="text-danger" v-if="errors && Object.keys(errors).length">
                                                {{ errors.category && Array.isArray(errors.category) ? errors.category[0] : errors.category }}
                                            </p>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-switch
                                            v-model="postForm.is_published"
                                            label="Is Published"
                                            color="red"
                                            value="red"
                                            hide-details
                                            :disabled="uploadingPost"
                                        ></v-switch>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-switch
                                            v-model="postForm.is_featured"
                                            label="Is Featured"
                                            color="red"
                                            value="red"
                                            hide-details
                                            :disabled="uploadingPost"
                                        ></v-switch>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-switch
                                            v-model="postForm.is_public"
                                            label="Is Public"
                                            color="red"
                                            value="red"
                                            hide-details
                                            :disabled="uploadingPost"
                                        ></v-switch>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-switch
                                            v-model="postForm.is_hidden"
                                            label="Is Hidden"
                                            color="red"
                                            value="red"
                                            hide-details
                                            :disabled="uploadingPost"
                                        ></v-switch>
                                    </v-col>
                                    <!--                                    <div class="my-2 custom-text-input">
                                                                            <label for="PostImage">Image: </label>
                                                                            <input type="file" id="postImage" @change="onChange">
                                                                            <p v-if="errors && Object.keys(errors).length">
                                                                                {{ errors.file && Array.isArray(errors.file) ? errors.file[0] : errors.file }}
                                                                            </p>
                                                                        </div>-->
                                    <v-col cols="12">
                                        <div>
                                            <div v-if='(uploadPercentage!==0 && uploadPercentage!==100)'>
                                                <div>Uploading: {{ uploadPercentage }}% ...</div>
                                                <progress max='100' :value.prop='uploadPercentage' style='width: 100%'></progress>
                                            </div>
                                            <div v-if='previewImages.length' class='mt-1 d-flex justify-start align-center flex-wrap'>
                                                <div v-for='(image, im) in previewImages' :key='im' class='formImageContainer'>
                                                    <img :src='image.src' alt='image' height='80px' class='rounded'
                                                         style='margin: 2px 6px 2px 0; max-width: 200px !important; width: auto'>
                                                    <v-icon class='imageCloseButton' color='error'
                                                            :disabled="uploadingPost"
                                                            @click.stop.prevent='removeImageFromCollection(im)'>
                                                        mdi-close-circle
                                                    </v-icon>
                                                </div>
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <div>
                                            <v-file-input
                                                v-model='photos'
                                                accept='image/png, image/jpeg, image/bmp, image/jpg, image/*'
                                                prepend-icon='mdi-camera'
                                                label='Upload photo'
                                                multiple
                                                counter
                                                small-chips
                                                show-size
                                                truncate-length='10'
                                                @change='onFilePicked'
                                                :disabled="uploadingPost"
                                            >
                                                <template #selection='{ text }'>
                                                    <v-chip small label color='primary'>
                                                        {{ text }}
                                                    </v-chip>
                                                </template>
                                            </v-file-input>
                                        </div>
                                    </v-col>


                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    {{ postForm }}
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="$emit('closeModal', false)" :disabled="uploadingPost">
                            Close
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="postRequest" :loading="uploadingPost" :disabled="uploadingPost">
                            <span v-if="formType === 'update'">Update</span>
                            <span v-else>Save</span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ComboBox from "@/components/Form/ComboBox";
import InputComponent from "@/components/Form/InputComponent";

export default {
    components: {ComboBox, InputComponent},
    props: {
        openModal: {
            type: Boolean,
            default: false
        },
        editMode: {
            type: Boolean,
            default: false
        },
        dataToUpdate: {
            type: Object,
            default: () => {
            }
        }
    },
    data: () => ({
        errors: [],
        CBOclicked: false,
        formType: 'create',
        postForm: {
            title: '',
            description: '',
            is_published: true,
            is_hidden: false,
            is_public: true,
            is_featured: false,
            tagsId: [],
            categoriesId: []
        },
        loading: false,
        uploadingPost: false,
        search: '',
        selected: [],
        selectedCategories: [],

        uploadPercentage: 0,
        photos: null,
        previewImages: [],
    }),
    computed: {
        ...mapGetters({
            categories: "category/categories",
            tags: "tag/tags",
            getErrors: "errors/errors",
        }),
        formData() {
            const formData = new FormData();
            if (this.formType === 'update') formData.append("_method", "PUT");
            formData.append("title", this.postForm.title);
            formData.append("description", this.postForm.description);
            formData.append("is_published", this.postForm.is_published ? 1 : 0);
            formData.append("is_featured", this.postForm.is_featured ? 1 : 0);
            formData.append("is_hidden", this.postForm.is_featured ? 1 : 0);
            formData.append("is_public", this.postForm.is_featured ? 1 : 0);

            if (this.photos && this.photos.length) {
                for (let i = 0; i < this.photos.length; i++) {
                    formData.append('photos[]', this.photos[i])
                }
            }
            if (this.postForm.categoriesId.length > 0) {
                for (let i = 0; i < this.postForm.categoriesId.length; i++) {
                    formData.append('category[]', this.postForm.categoriesId[i]);
                }
            } else formData.append('category', '');

            if (this.postForm.tagsId.length > 0) {
                for (let i = 0; i < this.postForm.tagsId.length; i++) {
                    formData.append('tag[]', this.postForm.tagsId[i]);
                }
            } else formData.append('tag', '');

            return formData;
        }
    },
    watch: {
        selected() {
            this.search = ''
        },
        dataToUpdate() {
            if (this.editMode && (this.dataToUpdate && Object.keys(this.dataToUpdate).length)) {
                // console.log(this.dataToUpdate)
                this.formType = 'update'
                this.updateForm()
            }
        }
    },
    methods: {
        ...mapActions({
            addPost: 'post/addPost',
            updatePost: 'post/updatePost',
        }),
        handleComboBoxClick() {
            this.CBOclicked = true
        },
        onFilePicked() {
            this.previewImages = []
            if (this.photos && this.photos.length) {
                this.photos.forEach(element => {
                    this.previewImages.push({'src': URL.createObjectURL(element)})
                })
            }
        },
        removeImageFromCollection(imageKey) {
            this.photos.splice(imageKey, 1)
            this.previewImages.splice(imageKey, 1)
        },
        updateForm() {
            if (this.formType === 'update' && Object.keys(this.dataToUpdate).length) {
                this.postForm = {
                    title: this.dataToUpdate.title,
                    description: this.dataToUpdate.description,
                    is_published: !!this.dataToUpdate.is_published,
                    is_hidden: !!this.dataToUpdate.is_hidden,
                    is_public: !!this.dataToUpdate.is_public,
                    is_featured: !!this.dataToUpdate.is_featured,
                    tagsId: this.dataToUpdate.tags.map(obj => {
                        return obj.id
                    }),
                    categoriesId: this.dataToUpdate.categories.map(obj => {
                        this.selectedCategories.push(obj.name);
                        return obj.id
                    })
                }
                console.log(this.postForm)
            }
        },
        onChange(e) {
            this.postForm.image = e.target.files[0];
        },
        updateSelectedCategoryValue(data) {
            const index = this.postForm.categoriesId.indexOf(data.id);
            if (index > -1) {
                this.postForm.categoriesId.splice(index, 1);
                this.selectedCategories.splice(index, 1);
            } else {
                this.postForm.categoriesId.push(data.id);
                this.selectedCategories.push(data.name);
            }
        },
        validation() {

        },
        async postRequest() {
            this.errors = {};
            this.validation();

            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            };
            this.uploadingPost = true
            if (this.formType === 'update') {
                const combinedData = {
                    "id": this.dataToUpdate.id,
                    "formData": this.formData,
                    "config": config
                }
                await this.updatePost(combinedData).then(() => {
                    if (this.getErrors && Object.keys(this.getErrors).length) {
                        this.errors = this.getErrors;
                        return;
                    }
                    this.$emit('closeModal', false)
                    this.dialog = false;
                }).finally(() => {
                    this.clearForm()
                });
            } else {
                await this.addPost(this.formData, config).then(() => {
                    if (this.getErrors && Object.keys(this.getErrors).length) {
                        this.errors = this.getErrors;
                        return;
                    }
                    this.$emit('closeModal', false)
                    this.dialog = false;
                }).finally(() => {
                    this.clearForm()
                });
            }
        },
        clearForm() {
            //this.dataToUpdate = {}
            this.uploadingPost = false
            this.postForm = {
                title: '',
                description: '',
                is_published: '',
                is_featured: '',
                tagsId: [],
                categoriesId: []
            };
        }
    },
}
</script>

<style scoped>
.custom-text-input {
    color: #1d2124;
}

.custom-text-input .label {
    font-size: 14px;
}

.custom-text-input input {
    border: 1px solid #1d2124;
    width: 100%;
    padding: 4px 10px;
    border-radius: 6px;
}

.custom-text-input input:focus {
    outline: 0;
}

.custom-text-input p {
    color: #ff3636;
    font-size: 14px;
}

.text-danger {
    font-size: 14px;
    color: #ff3636;
}

.formImageContainer {
    position: relative;
}

.imageCloseButton {
    position: absolute;
    top: -2px;
    right: 2px;
    background-color: #09153A;
    border-radius: 50%;
}
</style>
