import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { ChartType } from './chartDoughnat'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
)

export function ChartHorizontalBar({
  jsonData,
  className,
  backgroundColor = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(255, 0, 0)',
    'rgb(0, 255, 0)',
    'rgb(0, 0, 255)',
    'rgb(255, 255, 0)',
    'rgb(255, 0, 255)',
    'rgb(0, 255, 255)',
    'rgb(128, 0, 128)',
    'rgb(128, 128, 0)',
    'rgb(0, 128, 128)',
  ],
  borderColor,
}: {
  jsonData: ChartType[]
  className?: string
  backgroundColor?: string[]
  borderColor?: string[]
}) {
  const data = {
    labels: jsonData?.map((item) => item.nama),
    datasets: [
      {
        data: jsonData?.map((item) => item.jlh),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div
      className={`flex ${className ?? 'w-[20%]'} phones:w-full phones:justify-center`}
    >
      <Bar
        data={data}
        options={{ plugins: { legend: { display: false } }, indexAxis: 'y' }}
      />
    </div>
  )
}
