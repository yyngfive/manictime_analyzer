import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

export function SimpleBar({data,x,y,xlab='',ylab=''}){
    return (
        <ResponsiveContainer >
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={x} offset={5}><Label value={xlab} offset={-10} position="insideBottom" /></XAxis>
                <YAxis />
                <Tooltip />
                <Legend layout="vetical" verticalAlign="middle" align="right" />
                <Bar dataKey={y} fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}