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

export type ChartGroup4DataType = {
  label: string
  total: string
  data1: string
  data2: string
  data3: string
  data4: string
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
)

export function ChartBarGroup4Data({
  jsonData,
  className,
  label1,
  label2,
  label3,
  label4,
  borderColor,
  backgroundColor,
}: {
  jsonData: ChartGroup4DataType[]
  className?: string
  label1?: string
  label2?: string
  label3?: string
  label4?: string
  borderColor?: string[]
  backgroundColor?: string[]
}) {
  const data = {
    labels: jsonData?.map((item) => `${item.label} (${item.total})`), // Gabungkan label dengan total
    datasets: [
      {
        label: label1, // Label untuk data1
        data: jsonData?.map((item) => item.data1),
        backgroundColor: backgroundColor?.[0],
        borderColor: borderColor?.[0],
        borderWidth: 2,
        hoverOffset: 4,
      },
      {
        label: label2, // Label untuk data2
        data: jsonData?.map((item) => item.data2),
        backgroundColor: backgroundColor?.[1],
        borderColor: borderColor?.[1],
        borderWidth: 2,
        hoverOffset: 4,
      },
      {
        label: label3, // Label untuk data2
        data: jsonData?.map((item) => item.data3),
        backgroundColor: backgroundColor?.[2],
        borderColor: borderColor?.[2],
        borderWidth: 2,
        hoverOffset: 4,
      },
      {
        label: label4, // Label untuk data2
        data: jsonData?.map((item) => item.data4),
        backgroundColor: backgroundColor?.[3],
        borderColor: borderColor?.[3],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        display: true, // Tampilkan legenda untuk membedakan bar
      },
    },
    scales: {
      x: {
        stacked: false, // Tidak di-stack, sehingga bar terpisah
      },
      y: {
        stacked: false, // Tidak di-stack, sehingga bar terpisah
      },
    },
  }

  return (
    <div
      className={`flex ${className ?? 'w-[50%]'} phones:w-full phones:justify-center`}
    >
      <Bar data={data} options={options} />
    </div>
  )
}
