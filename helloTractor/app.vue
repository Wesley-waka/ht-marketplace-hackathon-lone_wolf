<script setup>
useHead({
  title: "Hello Tractor",
});

</script>

<template>
  <NuxtLayout>
    <Toaster position="top-right" richColors />
    <NuxtPage />
  </NuxtLayout>
</template>


<style>
:root {
  --background: 218 65% 100%;
  --foreground: 218 69% 2%;
  --muted: 188 35% 92%;
  --muted-foreground: 188 11% 36%;
  --popover: 0 0% 99%;
  --popover-foreground: 218 69% 1%;
  --card: 0 0% 99%;
  --card-foreground: 218 69% 1%;
  --border: 218 10% 95%;
  --input: 218 10% 95%;
  --primary: 13.8 100% 60.78%;
  --primary-foreground: 218 47% 99%;
  --secondary: 300 43.28% 26.27%;
  --secondary-foreground: 0 0% 100%;
  --accent: 193.47 73.13% 39.41%;
  --accent-foreground: 248 47% 99%;
  --destructive: 13 98% 27%;
  --destructive-foreground: 13 98% 87%;
  --ring: 218 47% 39%;
  --radius: 0.5rem;
}
</style>