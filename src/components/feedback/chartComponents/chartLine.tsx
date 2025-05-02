import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { ChartType } from './chartDoughnat'

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
)

export function ChartLine({
  jsonData,
  className,
  borderColor,
  backgroundColor,
  height = 100,
  label,
}: {
  jsonData: ChartType[]
  className?: string
  backgroundColor?: string
  borderColor?: string
  height?: number
  label?: string
}) {
  const data = {
    labels: jsonData?.map((item) => item.nama),
    datasets: [
      {
        label: label,
        data: jsonData?.map((item) => item.jlh),
        borderColor: borderColor,
        fill: true,
        backgroundColor: backgroundColor,
        tension: 0.1, // Adjust for line smoothing
      },
    ],
  }

  return (
    <div
      className={`flex ${className ?? 'w-[20%]'} phones:w-full phones:justify-center`}
    >
      <Line
        data={data}
        options={{
          plugins: { legend: { display: true } },
          elements: {
            line: {
              tension: 0.1, // Untuk garis lebih halus
              borderWidth: 2, // Untuk membuat garis lebih tebal
            },
            point: {
              radius: 5, // Ukuran titik
              hoverRadius: 7, // Ukuran titik saat di-hover
            },
          },
        }}
        height={height}
      />
    </div>
  )
}
