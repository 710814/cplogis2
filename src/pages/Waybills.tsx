import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockWaybills } from '@/data/mockData';
import { FileText, Printer, Eye, ArrowUpDown, Search } from 'lucide-react';
import { Waybill } from '@/types/shipment';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

const Waybills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWaybill, setSelectedWaybill] = useState<Waybill | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // 사용 가능한 모든 국가 목록 추출
  const uniqueCountries = Array.from(
    new Set(mockWaybills.map(waybill => waybill.recipientInfo.country))
  ).sort();

  const filteredWaybills = mockWaybills
    .filter(waybill => {
      // 검색어 필터링
      const matchesSearch =
        waybill.waybillNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        waybill.recipientInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        waybill.logisticsPartner.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 상태 필터링
      const matchesStatus = 
        selectedStatus === 'all' || 
        (selectedStatus === 'printed' && waybill.isPrinted) ||
        (selectedStatus === 'notPrinted' && !waybill.isPrinted);

      // 국가 필터링
      const matchesCountry = 
        selectedCountry === 'all' || 
        waybill.recipientInfo.country === selectedCountry;
      
      const waybillDate = new Date(waybill.createdAt);
      const matchesStart = !startDate || waybillDate >= new Date(startDate);
      const matchesEnd = !endDate || waybillDate <= new Date(endDate);
      
      return matchesSearch && matchesStatus && matchesCountry && matchesStart && matchesEnd;
    })
    .sort((a, b) => {
      // 날짜 필드에 대한 정렬
      if (sortField === 'createdAt') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      // 물류 파트너에 대한 정렬
      if (sortField === 'logisticsPartner') {
        return sortDirection === 'asc' 
          ? a.logisticsPartner.localeCompare(b.logisticsPartner)
          : b.logisticsPartner.localeCompare(a.logisticsPartner);
      }

      // 기본적인 문자열 필드에 대한 정렬
      if (sortField === 'waybillNumber') {
        return sortDirection === 'asc'
          ? a.waybillNumber.localeCompare(b.waybillNumber)
          : b.waybillNumber.localeCompare(a.waybillNumber);
      }

      // 국가별 정렬
      if (sortField === 'country') {
        return sortDirection === 'asc'
          ? a.recipientInfo.country.localeCompare(b.recipientInfo.country)
          : b.recipientInfo.country.localeCompare(a.recipientInfo.country);
      }

      return 0;
    });

  const isAllSelected = filteredWaybills.length > 0 && selectedRows.length === filteredWaybills.length;
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredWaybills.map(w => w.id));
    }
  };
  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
  };

  const handleViewWaybill = (waybill: Waybill) => {
    setSelectedWaybill(waybill);
    setDetailsDialogOpen(true);
  };

  const handlePrintWaybill = (waybill: Waybill) => {
    setSelectedWaybill(waybill);
    setPrintDialogOpen(true);
  };

  const handlePrint = () => {
    // In a real app, we would implement actual printing functionality
    console.log('Printing waybill:', selectedWaybill?.waybillNumber);
    
    // Mock updating the waybill status to printed
    setTimeout(() => {
      setPrintDialogOpen(false);
      // In real app: update the waybill status to printed
    }, 300);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      // 같은 필드를 다시 클릭하면 정렬 방향을 전환
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // 다른 필드를 클릭하면 해당 필드로 정렬하고 오름차순으로 시작
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 필터 초기화 함수
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedCountry('all');
    setSortField('createdAt');
    setSortDirection('desc');
    setStartDate('');
    setEndDate('');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">송장관리</h1>
          <p className="text-muted-foreground">생성된 송장을 확인하고 인쇄하세요.</p>
        </div>

        {/* 검색 및 필터 섹션 */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="검색 (송장번호, 수취인, 물류사)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="w-40">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 상태</SelectItem>
                    <SelectItem value="printed">인쇄완료</SelectItem>
                    <SelectItem value="notPrinted">미인쇄</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="국가 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 국가</SelectItem>
                    {uniqueCountries.map(country => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-[160px]"
                placeholder="시작일"
              />
              <Input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-[160px]"
                placeholder="종료일"
              />
              <Button variant="outline" onClick={resetFilters}>
                필터 초기화
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              총 {filteredWaybills.length}건의 송장 ({mockWaybills.length}건 중)
            </div>
            <div className="flex gap-2">
              <Button
                variant="default"
                className="bg-primary text-white"
                disabled={selectedRows.length === 0}
                onClick={() => {/* 선택된 송장 인쇄 로직 */}}
              >
                선택인쇄
              </Button>
              <Button
                variant="secondary"
                className="bg-blue-100 text-blue-800 border-blue-200"
                disabled={selectedRows.length === 0}
                onClick={() => {/* 선택된 송장 다운로드 로직 */}}
              >
                선택다운로드
              </Button>
            </div>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
                </TableHead>
                <TableHead className="w-[180px] cursor-pointer" onClick={() => handleSort('waybillNumber')}>
                  <div className="flex items-center gap-1">
                    송장번호
                    {sortField === 'waybillNumber' && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('logisticsPartner')}>
                  <div className="flex items-center gap-1">
                    물류사
                    {sortField === 'logisticsPartner' && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead>수취인</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('country')}>
                  <div className="flex items-center gap-1">
                    국가
                    {sortField === 'country' && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead>중량/패키지</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('createdAt')}>
                  <div className="flex items-center gap-1">
                    생성일
                    {sortField === 'createdAt' && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWaybills.length > 0 ? (
                filteredWaybills.map((waybill) => (
                  <TableRow key={waybill.id}>
                    <TableCell>
                      <Checkbox checked={selectedRows.includes(waybill.id)} onCheckedChange={() => handleSelectRow(waybill.id)} />
                    </TableCell>
                    <TableCell className="font-medium">{waybill.waybillNumber}</TableCell>
                    <TableCell>{waybill.logisticsPartner}</TableCell>
                    <TableCell>
                      <div>{waybill.recipientInfo.name}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {waybill.recipientInfo.address}
                      </div>
                    </TableCell>
                    <TableCell>{waybill.recipientInfo.country}</TableCell>
                    <TableCell>
                      <div className="text-sm">{waybill.shipmentDetails.weight} kg</div>
                      <div className="text-xs text-muted-foreground">{waybill.shipmentDetails.packageCount}개 패키지</div>
                    </TableCell>
                    <TableCell>{formatDate(waybill.createdAt)}</TableCell>
                    <TableCell>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                        waybill.isPrinted 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {waybill.isPrinted ? '인쇄됨' : '미인쇄'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewWaybill(waybill)}>
                          <Eye className="h-4 w-4 mr-1" />
                          상세
                        </Button>
                        <Button size="sm" onClick={() => handlePrintWaybill(waybill)}>
                          <Printer className="h-4 w-4 mr-1" />
                          인쇄
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Waybill Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>송장 상세정보</DialogTitle>
            <DialogDescription>
              송장번호: {selectedWaybill?.waybillNumber}
            </DialogDescription>
          </DialogHeader>
          
          {selectedWaybill && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium text-sm mb-2">발송자 정보</h3>
                    <p className="text-sm">{selectedWaybill.senderInfo.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedWaybill.senderInfo.address}</p>
                    <p className="text-sm text-muted-foreground">{selectedWaybill.senderInfo.contact}</p>
                  </div>
                  
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium text-sm mb-2">수취인 정보</h3>
                    <p className="text-sm">{selectedWaybill.recipientInfo.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedWaybill.recipientInfo.address}</p>
                    <p className="text-sm text-muted-foreground">{selectedWaybill.recipientInfo.contact}</p>
                    <p className="text-sm font-medium mt-1">국가: {selectedWaybill.recipientInfo.country}</p>
                  </div>
                </div>
                
                <div>
                  <div className="bg-secondary p-4 rounded-lg mb-4">
                    <h3 className="font-medium text-sm mb-2">배송 정보</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">물류 파트너:</div>
                      <div>{selectedWaybill.logisticsPartner}</div>
                      <div className="text-muted-foreground">중량:</div>
                      <div>{selectedWaybill.shipmentDetails.weight} kg</div>
                      <div className="text-muted-foreground">크기:</div>
                      <div>{selectedWaybill.shipmentDetails.dimensions}</div>
                      <div className="text-muted-foreground">패키지 수:</div>
                      <div>{selectedWaybill.shipmentDetails.packageCount}</div>
                      <div className="text-muted-foreground">신고금액:</div>
                      <div>${selectedWaybill.shipmentDetails.declaredValue}</div>
                      <div className="text-muted-foreground">상태:</div>
                      <div>{selectedWaybill.status}</div>
                      <div className="text-muted-foreground">인쇄 상태:</div>
                      <div>{selectedWaybill.isPrinted ? '인쇄됨' : '미인쇄'}</div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium text-sm mb-2">배송 품목</h3>
                    <div className="space-y-2">
                      {selectedWaybill.shipmentDetails.items.map((item, index) => (
                        <div key={index} className="text-sm border-b last:border-0 pb-1">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-2 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => window.open(selectedWaybill.trackingURL, '_blank')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  배송추적
                </Button>
                <Button
                  onClick={() => {
                    setDetailsDialogOpen(false);
                    setPrintDialogOpen(true);
                  }}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  송장 인쇄
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Print Waybill Dialog */}
      <Dialog open={printDialogOpen} onOpenChange={setPrintDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>송장 인쇄</DialogTitle>
            <DialogDescription>
              송장번호: {selectedWaybill?.waybillNumber} 인쇄 미리보기
            </DialogDescription>
          </DialogHeader>
          
          {selectedWaybill && (
            <div className="space-y-4">
              <div className="border rounded-md p-6 waybill-container bg-white">
                <div className="text-center font-bold text-lg mb-4">
                  {selectedWaybill.logisticsPartner}
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-sm text-muted-foreground">WAYBILL NUMBER</div>
                  <div className="font-bold text-xl">{selectedWaybill.waybillNumber}</div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div className="border-b pb-2">
                    <div className="text-muted-foreground">발송인:</div>
                    <div>{selectedWaybill.senderInfo.name}</div>
                    <div>{selectedWaybill.senderInfo.address}</div>
                    <div>{selectedWaybill.senderInfo.contact}</div>
                  </div>
                  
                  <div className="border-b pb-2">
                    <div className="text-muted-foreground">수취인:</div>
                    <div>{selectedWaybill.recipientInfo.name}</div>
                    <div>{selectedWaybill.recipientInfo.address}</div>
                    <div>{selectedWaybill.recipientInfo.contact}</div>
                    <div><strong>국가:</strong> {selectedWaybill.recipientInfo.country}</div>
                  </div>
                  
                  <div className="border-b pb-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-muted-foreground">중량:</div>
                        <div>{selectedWaybill.shipmentDetails.weight} kg</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">패키지:</div>
                        <div>{selectedWaybill.shipmentDetails.packageCount}개</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center text-xs text-muted-foreground">
                    송장발행일: {new Date(selectedWaybill.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <Button onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  인쇄하기
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Waybills;
