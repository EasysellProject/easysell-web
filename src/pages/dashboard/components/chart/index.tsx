import React, { CSSProperties } from 'react'
import { Bar, Line } from 'react-chartjs-2'

import styles from './styles'

interface ChartData {
    title?: string
    data?: any,
    labels?: any,
    height?: any,
    width?: any,
}

function LineChart(props: ChartData): JSX.Element {
    const { title, data, labels, height, width } = props
    console.log(props)
    return (
        <div style={{ height: height, width: width }}>
            < Line data={{
                labels: labels,
                datasets: [{
                    label: title,
                    data: data,
                }]
            }
            } type="line" height={height} width={width} options={{ maintainAspectRation: false }} />


        </div >
    )
}

export default LineChart