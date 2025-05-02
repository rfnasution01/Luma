/* eslint-disable @typescript-eslint/no-explicit-any */
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { ChartType } from '.'

ChartJS.register(ArcElement, Tooltip, Legend)

// Custom plugin to draw text in the center
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart: any) => {
    const { width } = chart
    const { height } = chart
    const ctx = chart.ctx
    ctx.save()

    const fontSize = 18
    ctx.font = `${fontSize}px sans-serif`
    ctx.fillStyle = '#333'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Text to display
    const text = '80%' // You can make this dynamic
    ctx.fillText(text, width / 2, height / 2)

    ctx.restore()
  },
}

export function ChartProgress({
  jsonData,
  className,
  backgroundColor = [
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
  ],
  borderColor = ['rgba(0, 0, 0, 0.1)'],
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
        data: jsonData?.map((item) => parseFloat(item.jlh)),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  }

  const options: ChartOptions<'doughnut'> = {
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltip
      },
    },
    cutout: '70%', // Creates a "doughnut" effect
  }

  ChartJS.register(centerTextPlugin) // Register the plugin

  return (
    <div
      className={`flex ${className ?? 'w-[20%]'} phones:w-full phones:justify-center`}
    >
      <Doughnut data={data} options={options} />
    </div>
  )
}
