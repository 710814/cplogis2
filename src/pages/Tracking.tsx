
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockTrackingInfo, mockWaybills } from '@/data/mockData';
import { Search } from 'lucide-react';
import TrackingTimeline from '@/components/tracking/TrackingTimeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrackingInfo } from '@/types/shipment';
import { format } from 'date-fns';

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<TrackingInfo | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const handleSearch = () => {
    if (!trackingNumber) {
      setSearchError('송장번호를 입력해주세요.');
      return;
    }
    
    setIsSearching(true);
    setSearchError('');
    
    // Simulate API call delay
    setTimeout(() => {
      const result = mockTrackingInfo[trackingNumber];
      
      if (result) {
        setTrackingResult(result);
      } else {
        setTrackingResult(null);
        setSearchError('해당 송장번호의 배송정보를 찾을 수 없습니다.');
      }
      
      setIsSearching(false);
    }, 800);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">배송추적</h1>
          <p className="text-muted-foreground">송장번호로 현재 배송상태를 확인하세요.</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>송장번호 조회</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="송장번호 입력 (예: SFD283917465)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={isSearching} className="flex items-center gap-1">
                <Search className="h-4 w-4" />
                {isSearching ? '검색중...' : '조회하기'}
              </Button>
            </div>
            
            {searchError && (
              <div className="mt-4 text-sm text-red-500">
                {searchError}
              </div>
            )}
            
            {trackingResult && (
              <div className="mt-6 space-y-4">
                <div className="bg-secondary p-4 rounded-md grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">송장번호:</span>
                    <span className="font-medium ml-2">{trackingResult.waybillNumber}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">배송사:</span>
                    <span className="font-medium ml-2">{trackingResult.carrier}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">배송상태:</span>
                    <span className="font-medium ml-2">{trackingResult.shipmentStatus}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">예상 도착일:</span>
                    <span className="font-medium ml-2">{trackingResult.estimatedDelivery}</span>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">배송 진행상황</h3>
                  <TrackingTimeline trackingInfo={trackingResult} />
                </div>
              </div>
            )}
            
            <div className="mt-6 text-sm text-center text-muted-foreground">
              <p>데모용 송장번호: SFD283917465, VDE789012345, TEL123456789</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Tracking;
