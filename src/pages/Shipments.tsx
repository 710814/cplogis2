
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockShipments } from '@/data/mockData';
import ShipmentStatusBadge from '@/components/shipments/ShipmentStatusBadge';
import { FileText, Package, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { ShipmentRequest } from '@/types/shipment';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FileDropzone from '@/components/upload/FileDropzone';

const Shipments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<ShipmentRequest | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const filteredShipments = mockShipments.filter(shipment => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (shipment: ShipmentRequest) => {
    setSelectedShipment(shipment);
    setDetailsDialogOpen(true);
  };

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleUploadSubmit = () => {
    // Mock API call to upload file
    console.log('Uploading file:', uploadedFile);
    
    // Close dialog and reset file
    setUploadDialogOpen(false);
    setTimeout(() => {
      setUploadedFile(null);
    }, 300);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">배송요청 관리</h1>
            <p className="text-muted-foreground">고객 배송요청을 관리하고 처리하세요.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setUploadDialogOpen(true)} variant="outline" className="flex items-center gap-1">
              <Upload className="h-4 w-4" />
              엑셀업로드
            </Button>
            <Button onClick={() => setCreateDialogOpen(true)} className="flex items-center gap-1">
              <Package className="h-4 w-4" />
              새 배송요청
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="검색 (ID, 수취인, 국가)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:max-w-xs"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="상태 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 상태</SelectItem>
              <SelectItem value="pending">대기중</SelectItem>
              <SelectItem value="processed">처리됨</SelectItem>
              <SelectItem value="completed">완료됨</SelectItem>
              <SelectItem value="cancelled">취소됨</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>주문번호</TableHead>
                <TableHead>요청일자</TableHead>
                <TableHead>수취인</TableHead>
                <TableHead>국가</TableHead>
                <TableHead>중량</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>물류사</TableHead>
                <TableHead className="text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.length > 0 ? (
                filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.id}</TableCell>
                    <TableCell>{format(new Date(shipment.requestDate), 'yyyy-MM-dd')}</TableCell>
                    <TableCell>{shipment.recipientName}</TableCell>
                    <TableCell>{shipment.country}</TableCell>
                    <TableCell>{shipment.totalWeight} kg</TableCell>
                    <TableCell>
                      <ShipmentStatusBadge status={shipment.status} />
                    </TableCell>
                    <TableCell>{shipment.logisticsPartner}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(shipment)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        상세보기
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Shipment Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>배송요청 상세정보</DialogTitle>
            <DialogDescription>
              주문번호: {selectedShipment?.id} | 요청일자: {selectedShipment ? format(new Date(selectedShipment.requestDate), 'yyyy-MM-dd HH:mm') : ''}
            </DialogDescription>
          </DialogHeader>
          
          {selectedShipment && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-medium text-sm mb-2">발송자 정보</h3>
                  <p className="text-sm">{selectedShipment.senderName}</p>
                  <p className="text-sm text-muted-foreground">{selectedShipment.senderAddress}</p>
                  <p className="text-sm text-muted-foreground">{selectedShipment.senderContact}</p>
                </div>
                
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-medium text-sm mb-2">수취인 정보</h3>
                  <p className="text-sm">{selectedShipment.recipientName}</p>
                  <p className="text-sm text-muted-foreground">{selectedShipment.recipientAddress}</p>
                  <p className="text-sm text-muted-foreground">{selectedShipment.recipientContact}</p>
                  <p className="text-sm font-medium mt-1">국가: {selectedShipment.country}</p>
                </div>
              </div>
              
              <div>
                <div className="bg-secondary p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-sm mb-2">배송 정보</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">물류 파트너:</div>
                    <div>{selectedShipment.logisticsPartner}</div>
                    <div className="text-muted-foreground">총 중량:</div>
                    <div>{selectedShipment.totalWeight} kg</div>
                    <div className="text-muted-foreground">상태:</div>
                    <div><ShipmentStatusBadge status={selectedShipment.status} /></div>
                    {selectedShipment.waybillNumber && (
                      <>
                        <div className="text-muted-foreground">송장번호:</div>
                        <div>{selectedShipment.waybillNumber}</div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-medium text-sm mb-2">배송 품목 ({selectedShipment.items.length})</h3>
                  <div className="space-y-2">
                    {selectedShipment.items.map((item, index) => (
                      <div key={index} className="text-sm border-b last:border-0 pb-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{item.description}</span>
                          <span className="text-muted-foreground">x{item.quantity}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground text-xs">
                          <span>{item.weight} kg</span>
                          <span>금액: ${item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create New Shipment Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>새 배송요청 생성</DialogTitle>
            <DialogDescription>
              새로운 배송요청 정보를 입력하세요. 모든 필수 항목을 작성해야 합니다.
            </DialogDescription>
          </DialogHeader>
          
          <div className="pt-2">
            <p className="text-center text-muted-foreground">이 기능은 데모에서는 사용할 수 없습니다.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Excel Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>엑셀파일 업로드</DialogTitle>
            <DialogDescription>
              배송요청 목록이 포함된 엑셀 파일을 업로드하세요.
            </DialogDescription>
          </DialogHeader>
          
          <FileDropzone
            acceptedFileTypes={[".xlsx", ".csv"]}
            onFilesAdded={handleFileUpload}
            maxFiles={1}
          />
          
          {uploadedFile && (
            <div className="text-sm mt-2">
              <span>선택된 파일: <span className="font-medium">{uploadedFile.name}</span></span>
            </div>
          )}
          
          <Button 
            onClick={handleUploadSubmit} 
            disabled={!uploadedFile}
            className="w-full"
          >
            업로드
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Shipments;
