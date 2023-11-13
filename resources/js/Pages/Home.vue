<script setup>
import { Head, Link } from "@inertiajs/vue3";

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
</script>

<template>
    <Head title="Página inicial" />
    <main class="max-h-screen overflow-hidden">
        <nav class="h-screen sm:flex">
            <a href="/mapa" class="w-full h-2/4 sm:h-full block bg-blue-200 m-auto">
                <section class="h-full relative flex justify-center items-center" style="transform-style: preserve-3d;">
                    <div class="rounded-full h-72 w-72 absolute bg-WorldMap bg-cover bg-repeat-x hover:animate-worldRotate flex justify-center items-center border-8 border-black">
                        <h1 class="text-white uppercase tracking-widest text-6xl font-black bg-blue-900">
                            mapa
                        </h1>
                    </div>
                </section>
            </a>
            <a href="/grafico" class="w-full h-2/4 sm:h-full bg-blue-900 flex justify-center items-center flex-col">
                <div class="bg-white w-64 h-64 flex group border-8 border-black">
                    <div class="w-2/12 h-8 bg-yellow-400 group-hover:h-56 mt-auto transition-all duration-500 mx-2"></div>
                    <div class="w-2/12 h-32 bg-rose-400 group-hover:h-3 mt-auto transition-all duration-500 mx-2"></div>
                    <div class="w-2/12 h-3 bg-red-400 group-hover:h-20 mt-auto transition-all duration-500 mx-2"></div>
                    <div class="w-2/12 h-56 bg-green-400 group-hover:h-3 mt-auto transition-all duration-500 mx-2"></div>
                    <div class="w-2/12 h-52 bg-blue-400 group-hover:h-8 mt-auto transition-all duration-500 mx-2"></div>

                </div>
                <h1 class="text-white uppercase tracking-widest text-6xl font-black py-2">
                    gráfico
                </h1>
            </a>
        </nav>
    </main>
</template>

<style>
.bg-dots-darker {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
}
@media (prefers-color-scheme: dark) {
    .dark\:bg-dots-lighter {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
    }
}
</style>
