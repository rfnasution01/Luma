import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

export type ChartGroup3DataType = {
  label: string
  total: string
  data1: string
  data2: string
  data3: string
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
)
export function ChartLineGroup3Data({
  jsonData,
  className,
  label1,
  label2,
  label3,
  borderColor,
  backgroundColor,
  height = 100,
}: {
  jsonData: ChartGroup3DataType[]
  className?: string
  label1?: string
  label2?: string
  label3?: string
  borderColor?: string[]
  backgroundColor?: string[]
  height?: number
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
    ],
  }

  return (
    <div
      className={`flex ${className ?? 'w-[50%]'} phones:w-full phones:justify-center`}
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
          scales: {
            x: {
              stacked: false, // Tidak di-stack, sehingga bar terpisah
            },
            y: {
              stacked: false, // Tidak di-stack, sehingga bar terpisah
            },
          },
        }}
        height={height}
      />
    </div>
  )
}
