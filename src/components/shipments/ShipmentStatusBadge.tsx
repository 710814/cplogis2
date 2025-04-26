
import React from "react";
import { cn } from "@/lib/utils";

interface ShipmentStatusBadgeProps {
  status: 'pending' | 'processed' | 'completed' | 'cancelled';
  className?: string;
}

const ShipmentStatusBadge: React.FC<ShipmentStatusBadgeProps> = ({
  status,
  className,
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'processed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'pending':
        return '대기중';
      case 'processed':
        return '처리됨';
      case 'completed':
        return '완료됨';
      case 'cancelled':
        return '취소됨';
      default:
        return status;
    }
  };

  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-xs font-medium border',
        getStatusStyles(),
        className
      )}
    >
      {getStatusLabel()}
    </span>
  );
};

export default ShipmentStatusBadge;
