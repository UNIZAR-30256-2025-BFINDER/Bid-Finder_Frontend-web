// src/components/graphs/CategoryPieChart.tsx

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getStatsCategorias, StatsCategoria } from '../../features/dashboard/services/statsService';  // Importamos el tipo adecuado

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    TooltipItem,
} from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CategoryPieChart: React.FC = () => {
    const [categories, setCategories] = useState<StatsCategoria[]>([]);  // Cambiamos a StatsCategoria[]
    const [loading, setLoading] = useState(true);  // Estado para el loading

    // Llamada a la API para obtener las categorías
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getStatsCategorias();  // Llamada al servicio que creamos
                setCategories(data);  // Guardamos los datos
            } catch (error) {
                console.error('Error al cargar categorías', error);
            } finally {
                setLoading(false);  // Terminamos la carga
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p className="text-gray-400 animate-pulse">Cargando gráfico...</p>;

    // Datos para el gráfico circular
    const data = {
        labels: categories.map((item) => item.categoria),  // Etiquetas de categorías
        datasets: [
            {
                data: categories.map((item) => item.total),  // Datos de las subastas por categoría
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],  // Colores del gráfico
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: TooltipItem<'pie'>) => `${tooltipItem.label}: ${tooltipItem.raw}`,  // Tipado adecuado para tooltipItem
                },
            },
        },
    };

    return (
        <div className="p-6 bg-[#0A0D14] border border-white/5 rounded-2xl shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold text-white mb-4">Distribución de Categorías</h2>
            <div className="w-full max-w-xs">
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default CategoryPieChart;