import React, { CSSProperties } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { APP_COLORS } from '../../../../shared/styles'

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
        <div style={{ display: 'flex', height: 512, width: 1024, padding: 16, marginTop: 48, backgroundColor: 'white', borderRadius: 8, alignSelf: 'center' }}>
            <Line data={{
                labels: labels,
                datasets: [{
                    label: title,
                    backgroundColor: APP_COLORS.lightTurquoise,
                    borderColor: APP_COLORS.darkGreen,
                    data: data,
                }]
            }
            }
                type="line"
                height={480}
                width={992}
                options={{ maintainAspectRation: true, plugins: { legend: { display: false } } }} />
        </div>
    )
}

export default LineChart