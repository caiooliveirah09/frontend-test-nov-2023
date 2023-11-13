<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

// Registra os plugins do Chart.js
Chart.register(...registerables);

// Define as variáveis que serão utilizadas
const props = defineProps({
    dados: Object
});

onMounted(() => {
    // Se tiver dados, cria os gráficos
    if (props.dados) {
        // Obtém os elementos canvas
        const ctxPrecipitation = document.getElementById('precipitationChart').getContext('2d');
        const ctxTemperature = document.getElementById('temperatureChart').getContext('2d');

        // Passa o gráfico pros elementos canvas
        precipitationChart.value = new Chart(ctxPrecipitation, {
            type: 'bar',
            data: {
                labels: props.dados.labels,
                datasets: [
                    {
                        label: props.dados.datasets[0].label,
                        data: props.dados.datasets[0].data,
                        backgroundColor: props.dados.datasets[0].backgroundColor,
                        borderColor: props.dados.datasets[0].borderColor,
                        borderWidth: props.dados.datasets[0].borderWidth
                    }
                ]
            },
            options: {
                responsive: true,
                // libera para conseguir manipular o tamanho do gráfico
                maintainAspectRatio: false,
            }
        });

        // Passa o gráfico pro elemento canvas
        temperatureChart.value = new Chart(ctxTemperature, {
            type: 'line',
            data: {
                labels: props.dados.labels,
                datasets: [
                    {
                        label: props.dados.datasets[1].label,
                        data: props.dados.datasets[1].data,
                        backgroundColor: props.dados.datasets[1].backgroundColor,
                        borderColor: props.dados.datasets[1].borderColor,
                        borderWidth: props.dados.datasets[1].borderWidth
                    }
                ]
            },
            options: {
                responsive: true,
                // libera para conseguir manipular o tamanho do gráfico
                maintainAspectRatio: false,
            }
        });
    }
});

</script>

<template>
    <div class="h-screen max-h-screen sm:flex">
        <div class="w-full h-2/4 sm:h-full sm:w-2/4">
            <canvas id="precipitationChart"></canvas>
        </div>
        <div class="w-full h-2/4 sm:h-full sm:w-2/4">
            <canvas id="temperatureChart"></canvas>
        </div>
    </div>
</template>
