// src/components/graphs/CategoryPieChart.tsx

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getStatsCategorias, StatsCategoria } from '../../features/dashboard/services/statsService';
import {
    ChartData,
    ChartOptions,
    TooltipItem,
} from 'chart.js';

const CategoryPieChart: React.FC = () => {
    const [categories, setCategories] = useState<StatsCategoria[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getStatsCategorias();
                setCategories(data);
            } catch (error) {
                console.error('Error al cargar categorías', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <p className="text-gray-400 animate-pulse">Cargando gráfico...</p>;
    }

    if (categories.length === 0) {
        return (
            <div className="h-full p-5 sm:p-6 bg-[#0A0D14] border border-white/5 rounded-2xl shadow-md">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
                    Distribución de Categorías
                </h2>
                <p className="text-gray-400">No hay datos de categorías disponibles.</p>
            </div>
        );
    }

    const data: ChartData<'pie'> = {
        labels: categories.map((item) => item.categoria || 'Sin categoría'),
        datasets: [
            {
                data: categories.map((item) => item.total),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#D1D5DB',
                    boxWidth: 12,
                    padding: 16,
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: TooltipItem<'pie'>) =>
                        `${tooltipItem.label}: ${tooltipItem.raw}`,
                },
            },
        },
    };

    return (
        <div className="h-full p-5 sm:p-6 bg-[#0A0D14] border border-white/5 rounded-2xl shadow-md flex flex-col">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
                Distribución de Categorías
            </h2>
            <div className="w-full h-64 sm:h-72 md:h-80">
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default CategoryPieChart;