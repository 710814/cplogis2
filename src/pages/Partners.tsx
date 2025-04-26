
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockLogisticsPartners } from '@/data/mockData';
import { Truck, Search, Link } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LogisticsPartner } from '@/types/shipment';

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [partnerDetailsOpen, setPartnerDetailsOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<LogisticsPartner | null>(null);

  const filteredPartners = mockLogisticsPartners.filter(partner => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleViewPartnerDetails = (partner: LogisticsPartner) => {
    setSelectedPartner(partner);
    setPartnerDetailsOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">물류사관리</h1>
            <p className="text-muted-foreground">협력 물류사 정보를 확인하고 관리하세요.</p>
          </div>
          <div>
            <Button className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              새 물류사 추가
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="검색 (이름, 국가, 담당자)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:max-w-xs"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPartners.length > 0 ? (
            filteredPartners.map((partner) => (
              <Card key={partner.id} className="overflow-hidden">
                <CardHeader className="bg-primary/5 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <Badge variant={partner.hasAPI ? "default" : "outline"}>
                      {partner.hasAPI ? 'API 연동' : '수동 연동'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{partner.country}</p>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">담당자</p>
                      <p className="text-sm">{partner.contactPerson}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">연락처</p>
                      <p className="text-sm">{partner.email}</p>
                      <p className="text-sm">{partner.phone}</p>
                    </div>
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleViewPartnerDetails(partner)}
                      >
                        상세정보 보기
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Partner Details Dialog */}
      <Dialog open={partnerDetailsOpen} onOpenChange={setPartnerDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>물류사 상세정보</DialogTitle>
            <DialogDescription>
              {selectedPartner?.name} - {selectedPartner?.country}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPartner && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium mb-2">기본 정보</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-muted-foreground">ID:</span>
                        <span className="text-sm">{selectedPartner.id}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-muted-foreground">회사명:</span>
                        <span className="text-sm">{selectedPartner.name}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-muted-foreground">국가:</span>
                        <span className="text-sm">{selectedPartner.country}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium mb-2">담당자 정보</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-muted-foreground">담당자:</span>
                        <span className="text-sm">{selectedPartner.contactPerson}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-muted-foreground">이메일:</span>
                        <span className="text-sm">{selectedPartner.email}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-muted-foreground">전화번호:</span>
                        <span className="text-sm">{selectedPartner.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium mb-2">연동 정보</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2">
                        <span className="text-sm text-muted-foreground">API 연동:</span>
                        <span className="text-sm">{selectedPartner.hasAPI ? '가능' : '불가능'}</span>
                      </div>
                      {selectedPartner.hasAPI && selectedPartner.apiEndpoint && (
                        <div className="grid grid-cols-2">
                          <span className="text-sm text-muted-foreground">API 엔드포인트:</span>
                          <span className="text-sm truncate">{selectedPartner.apiEndpoint}</span>
                        </div>
                      )}
                      {selectedPartner.hasAPI && selectedPartner.apiKey && (
                        <div className="grid grid-cols-2">
                          <span className="text-sm text-muted-foreground">API 키:</span>
                          <span className="text-sm truncate">••••••••{selectedPartner.apiKey.slice(-4)}</span>
                        </div>
                      )}
                      {selectedPartner.trackingURL && (
                        <div className="grid grid-cols-2">
                          <span className="text-sm text-muted-foreground">추적 URL:</span>
                          <span className="text-sm truncate">{selectedPartner.trackingURL}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium mb-2">통합 설정</h3>
                    <div className="space-y-2">
                      {selectedPartner.hasAPI ? (
                        <div>
                          <span className="text-sm text-green-500 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            API 연동 설정됨
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            자동 배송요청 및 송장발행, 배송추적이 가능합니다.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <span className="text-sm text-amber-500 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            수동 처리 필요
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            파일 업로드를 통한 배송요청 및 송장정보 수신이 필요합니다.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-2 flex justify-between">
                {selectedPartner.trackingURL && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(selectedPartner.trackingURL?.replace('{trackingNumber}', ''), '_blank')}
                    className="flex items-center gap-1"
                  >
                    <Link className="h-4 w-4" />
                    배송추적 사이트 방문
                  </Button>
                )}
                <Button
                  variant="default"
                  className="ml-auto"
                >
                  수정하기
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Partners;
