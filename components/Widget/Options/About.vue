<template>
    <div>
        <h2>About</h2>
        <hr />

        <div class="flex items-center gap-2 mt-2">
            <img src="/icon/128.png" width="96" height="96" />
            <div>
                <h3 class="my-[0!important]">AC Music App</h3>
                <p>
                    Play Animal Crossing's smooth background music in real-time throughout your day. A successor to the
                    <AppLink href="https://github.com/animal-crossing-music-extension/ac-music-extension">AC Music Extension</AppLink>.
                </p>
            </div>
        </div>

        <br />

        <p>
            AC Music App is an unofficial, non-profit,
            <AppLink href="https://github.com/animal-crossing-music-extension/ac-music-app">open-source</AppLink> project that allows you to play
            music from the Animal Crossing series in your browser. It makes use of Nintendo's resources under
            <AppLink href="https://en.wikipedia.org/wiki/Fair_use">Fair Use</AppLink>.
        </p>

        <h3>Version</h3>
        <p>v{{ version }}</p>

        <h3>Contributors</h3>
        <ul class="ml-6 list-disc">
            <li>
                You can find a list of contributors to the project
                <AppLink href="https://github.com/animal-crossing-music-extension/ac-music-app/graphs/contributors">here</AppLink>.
            </li>
            <li>Server hosting provided by <AppLink href="https://pikadude.me">PikaDude</AppLink>.</li>
            <li>
                Original extension (v1) created by <AppLink href="https://www.neogaf.com/members/andrex.20593/">Andrex</AppLink> from
                <AppLink href="https://www.neogaf.com/threads/real-time-animal-crossing-music.473164/post-37661922">NeoGAF</AppLink>.
            </li>
            <li>Original extension (v2) improved by <AppLink href="https://www.neogaf.com/members/blazescorch2.142800/">blazescorch2</AppLink>.</li>
            <li>
                Original extension (v3-v4) continued by
                <AppLink href="https://github.com/animal-crossing-music-extension/ac-music-extension/graphs/contributors">these contributors</AppLink>
            </li>
            <li>Idea for extension/app taken from <AppLink href="http://tane.us/ac/">tane.us</AppLink>.</li>
        </ul>
    </div>
</template>

<script lang="ts">
import pkg from '~/package.json';

export default defineComponent({
    data() {
        return {
            version: pkg.version,
        };
    },
});
</script>
