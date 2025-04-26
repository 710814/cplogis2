
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Package, FileText } from 'lucide-react';
import MetricsCard from '@/components/dashboard/MetricsCard';
import ShipmentChart from '@/components/dashboard/ShipmentChart';
import DeliveryTimeCard from '@/components/dashboard/DeliveryTimeCard';
import ShipmentStatusPie from '@/components/dashboard/ShipmentStatusPie';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockShipments, mockWaybills } from '@/data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // 통계 계산
  const totalShipments = mockShipments.length;
  const pendingShipments = mockShipments.filter(s => s.status === 'pending').length;
  const nonPrintedWaybills = mockWaybills.filter(w => !w.isPrinted).length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">대시보드</h1>
          <p className="text-muted-foreground">물류 발송 관리 현황을 확인하세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard 
            title="총 배송 건수"
            value={totalShipments}
            icon={<Package className="h-4 w-4" />}
            description="전체 배송 요청"
          />
          <MetricsCard 
            title="대기중 배송요청"
            value={pendingShipments}
            icon={<Package className="h-4 w-4" />}
            description="처리가 필요한 배송요청"
          />
          <DeliveryTimeCard />
          <MetricsCard 
            title="미인쇄 송장"
            value={nonPrintedWaybills}
            icon={<FileText className="h-4 w-4" />}
            description="인쇄가 필요한 송장"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <ShipmentStatusPie />
          <ShipmentChart />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>최근 배송요청</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockShipments.slice(0, 5).map((shipment) => (
                  <div key={shipment.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <div className="font-medium">{shipment.recipientName}</div>
                      <div className="text-xs text-muted-foreground">{shipment.country} • {new Date(shipment.requestDate).toLocaleDateString('ko-KR')}</div>
                    </div>
                    <div className="text-sm">
                      {shipment.status === 'pending' && <span className="text-amber-500">대기중</span>}
                      {shipment.status === 'processed' && <span className="text-blue-500">처리됨</span>}
                      {shipment.status === 'completed' && <span className="text-green-500">완료됨</span>}
                      {shipment.status === 'cancelled' && <span className="text-red-500">취소됨</span>}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                className="w-full mt-4 py-2 text-sm text-primary hover:text-primary/70 hover:underline"
                onClick={() => navigate('/shipments')}
              >
                모든 배송요청 보기
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>최근 생성된 송장</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWaybills.slice(0, 3).map((waybill) => (
                  <div key={waybill.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <div className="font-medium">송장번호: {waybill.waybillNumber}</div>
                      <div className="text-xs text-muted-foreground">{waybill.logisticsPartner} • {new Date(waybill.createdAt).toLocaleDateString('ko-KR')}</div>
                    </div>
                    <div className="text-sm">
                      {waybill.isPrinted ? 
                        <span className="text-green-500">인쇄됨</span> : 
                        <span className="text-amber-500">미인쇄</span>}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                className="w-full mt-4 py-2 text-sm text-primary hover:text-primary/70 hover:underline"
                onClick={() => navigate('/waybills')}
              >
                모든 송장 보기
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
