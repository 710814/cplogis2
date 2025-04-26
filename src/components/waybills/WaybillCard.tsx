
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Waybill } from "@/types/shipment";
import { FileText } from "lucide-react";

interface WaybillCardProps {
  waybill: Waybill;
  onPrint: (waybill: Waybill) => void;
  onView: (waybill: Waybill) => void;
}

const WaybillCard: React.FC<WaybillCardProps> = ({ waybill, onPrint, onView }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/10 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FileText size={16} />
            {waybill.waybillNumber}
          </CardTitle>
          <span className="text-xs bg-primary/20 px-2 py-0.5 rounded">
            {waybill.logisticsPartner}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2 text-sm">
        <div>
          <div className="text-muted-foreground text-xs">발송인</div>
          <div className="font-medium">{waybill.senderInfo.name}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-xs">수취인</div>
          <div className="font-medium">{waybill.recipientInfo.name}</div>
          <div className="text-xs truncate">{waybill.recipientInfo.address}</div>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground text-xs">중량: {waybill.shipmentDetails.weight} kg</span>
          <span className="text-muted-foreground text-xs">패키지: {waybill.shipmentDetails.packageCount}개</span>
        </div>
      </CardContent>
      <CardFooter className="bg-secondary/50 p-3 flex justify-between items-center">
        <div className={`text-xs ${waybill.isPrinted ? 'text-green-600' : 'text-amber-600'} font-medium`}>
          {waybill.isPrinted ? '인쇄됨' : '미인쇄'}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onView(waybill)}>
            상세보기
          </Button>
          <Button size="sm" onClick={() => onPrint(waybill)}>
            인쇄
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WaybillCard;
