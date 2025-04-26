import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { mockShipments } from '@/data/mockData';

const ShipmentChart = () => {
  // 국가별 카운트 계산
  const countryData = {};
  
  // 모든 shipment를 순회하며 국가별 카운트 계산
  mockShipments.forEach(shipment => {
    const country = shipment.country;
    if (countryData[country]) {
      countryData[country]++;
    } else {
      countryData[country] = 1;
    }
  });
  
  // 데이터 포맷 변환
  const data = Object.keys(countryData).map(country => ({
    name: country,
    value: countryData[country]
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>국가별 배송 현황</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentChart;
