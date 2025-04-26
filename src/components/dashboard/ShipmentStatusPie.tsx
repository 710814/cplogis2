
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { mockShipments } from '@/data/mockData';

const ShipmentStatusPie = () => {
  const data = [
    { name: '처리중', value: mockShipments.filter(s => s.status === 'pending').length },
    { name: '배송중', value: mockShipments.filter(s => s.status === 'processed').length },
    { name: '완료', value: mockShipments.filter(s => s.status === 'completed').length },
  ];

  const COLORS = ['#8B5CF6', '#F97316', '#10B981'];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>배송 상태별 현황</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentStatusPie;
