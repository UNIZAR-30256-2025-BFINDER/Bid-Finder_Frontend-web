/**
 * @fileoverview Gráfica de barras horizontales/verticales para mostrar 
 * el Top 10 de zonas/municipios con mayor volumen de subastas activas.
 */

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions, TooltipItem } from 'chart.js';
import {
    getStatsProvincias,
    StatsProvincia,
} from '../../features/dashboard/services/statsService';

/**
 * Renderiza la gráfica de zonas activas utilizando Chart.js, limitando 
 * visualmente los resultados al top 10.
 */
const ProvinceBarChart: React.FC = () => {
    const [zonas, setZonas] = useState<StatsProvincia[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchZonas = async () => {
            try {
                const data = await getStatsProvincias();
                setZonas(data.slice(0, 10));
            } catch (error) {
                console.error('Error al cargar estadísticas por zona', error);
            } finally {
                setLoading(false);
            }
        };

        fetchZonas();
    }, []);

    if (loading) {
        return <p className="text-gray-400 animate-pulse">Cargando gráfico...</p>;
    }

    if (zonas.length === 0) {
        return (
            <div className="h-full p-5 sm:p-6 bg-[#0A0D14] border border-white/5 rounded-2xl shadow-md">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
                    Top 10 Zonas Activas
                </h2>
                <p className="text-gray-400">No hay datos de zonas disponibles.</p>
            </div>
        );
    }

    const data: ChartData<'bar'> = {
        labels: zonas.map((item) => item.provincia || 'Sin zona definida'),
        datasets: [
            {
                label: 'Subastas',
                data: zonas.map((item) => item.total),
                backgroundColor: '#FACC15',
                borderRadius: 8,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#FFFFFF',
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: TooltipItem<'bar'>) =>
                        `Subastas: ${tooltipItem.raw}`,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#D1D5DB',
                },
                grid: {
                    color: 'rgba(255,255,255,0.05)',
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#D1D5DB',
                    precision: 0,
                },
                grid: {
                    color: 'rgba(255,255,255,0.05)',
                },
            },
        },
    };

    return (
        <div className="h-full p-5 sm:p-6 bg-[#0A0D14] border border-white/5 rounded-2xl shadow-md flex flex-col">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
                Top 10 Zonas Activas
            </h2>
            <div className="w-full h-72 sm:h-80 md:h-96">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default ProvinceBarChart;