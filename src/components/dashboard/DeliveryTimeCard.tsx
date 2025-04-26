
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockShipments } from '@/data/mockData';
import { CalendarDays } from 'lucide-react';

const DeliveryTimeCard = () => {
  // 평균 배송 시간 계산 (목업 데이터)
  const averageDeliveryDays = 3.5;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">평균 배송 소요일</CardTitle>
        <CalendarDays className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{averageDeliveryDays}일</div>
        <p className="text-xs text-muted-foreground mt-1">
          Door to Door 기준
        </p>
      </CardContent>
    </Card>
  );
};

export default DeliveryTimeCard;
