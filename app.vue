<template>
    <div>
        <Head>
            <Title>{{ title }}</Title>
            <Meta name="description" :content="description" />
            <Meta name="theme-color" :content="color" />

            <Link rel="shortcut icon" :href="icon" />
            <Link rel="icon" :href="icon" type="image/ico" />
            <Link rel="canonical" :href="fullURL" />

            <Link rel="apple-touch-icon" :href="icon" />

            <Meta name="twitter:card" content="summary" />
            <Meta name="twitter:site" content="@ac_music_ext" />
            <Meta name="twitter:title" :content="title" />
            <Meta name="twitter:image" :content="image" />

            <Meta property="og:site_name" :content="siteName" />
            <Meta property="og:title" :content="title" />
            <Meta property="og:type" content="website" />
            <Meta property="og:description" :content="description" />
            <Meta property="og:url" :content="fullURL" />
            <Meta property="og:image" :content="image" />
        </Head>

        <div>
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </div>

        <NoScript>
            <div class="fixed z-10 flex items-center justify-center w-screen h-screen">
                <p class="text-xl font-bold text-white">Please enable JavaScript</p>
            </div>
        </NoScript>
    </div>
</template>

<script lang="ts" setup>
const title = 'AC Music App';
const siteName = 'AC Music App';
const description = "A successor to the Animal Crossing Music extension, play Animal Crossing's background music in real-time throughout your day!";
const color = '#65B949';
const icon = '/favicon.ico';
const fullURL = 'https://acmusic.app';
const image = '/icon/256.png';
</script>
