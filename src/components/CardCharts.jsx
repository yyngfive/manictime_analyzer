
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, AreaChart,Area ,Brush} from 'recharts';

//TODO: 更好的颜色筛选器
const colors = ['#277DA1', '#577590', '#4D908E', '#43AA8B', '#90BE6D', '#F9C74F', '#F9844A', '#F8961E', '#F3722C', '#F94144'];

export function SimpleBar({ data, x, y, xlab = '', ylab = '' }) {

    return (
        <ResponsiveContainer >
            <BarChart data={data} margin={{ left: 30, right: 60, top: 0, bottom: 30 }}>

                <XAxis dataKey={x} className='text-sm'>
                    <Label value={xlab} offset={-10} position="insideBottom" className='text-base pb-10' />
                </XAxis>
                <YAxis className='text-sm'>
                    <Label value={ylab} position={{ x: 10, y: 20 }} angle={-90} className='text-base' offset={5} />
                </YAxis>
                <Tooltip />
                {y.map((e, i) => (
                    <Bar key={i} dataKey={e} fill={colors[i]} />
                ))}
                {
                    y[0] != 'Duration' && <Legend verticalAlign="top"></Legend>
                }
                <Brush dataKey={x} stroke={colors[0]} height={15}/>

            </BarChart>
        </ResponsiveContainer>
    );
}

export function TinyArea({ data, y }) {

    console.log(y)

    return (
        <ResponsiveContainer>
            <AreaChart data={data} margin={{ left: 10, right: 10, top: 0, bottom: 10 }}>
                
                {y.map((e, i) => (
                    <Area key={i} dataKey={e} stroke={colors[i]} fill={colors[i]} type='monotone'  stackId={i} />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    );
}

