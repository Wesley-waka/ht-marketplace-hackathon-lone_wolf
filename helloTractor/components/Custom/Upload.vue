<template>
    <div class="card flex flex-col items-center gap-6">
          <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-full w-40" />
          <div v-else class="outlined">
            <img src="/public/Sunset Blaze/HT_ICONS_ORANGE-32.png" class="w-40" alt="">
          </div>
          <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined">
            <template #uploadicon>
              <img src="/public/Sunset Blaze/HT_ICONS_ORANGE-29.png" alt="">
            </template>
            <template #content>
              <span class="p-button-label">Upload</span>
            </template>
          </FileUpload>
        </div>
</template>

<script setup>
import { ref } from "vue";

const src = ref(null);

function onFileSelect(event) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
        src.value = e.target.result;
    };

    reader.readAsDataURL(file);
}
</script>