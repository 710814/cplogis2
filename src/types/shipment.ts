
export interface ShipmentRequest {
  id: string;
  requestDate: string; 
  senderName: string;
  senderAddress: string;
  senderContact: string;
  recipientName: string;
  recipientAddress: string;
  recipientContact: string;
  country: string;
  items: {
    description: string;
    quantity: number;
    weight: number;
    value: number;
  }[];
  totalWeight: number;
  status: 'pending' | 'processed' | 'completed' | 'cancelled';
  logisticsPartner: string;
  waybillNumber?: string;
  createdAt: string;
}

export interface Waybill {
  id: string;
  waybillNumber: string;
  shipmentRequestId: string;
  logisticsPartner: string;
  recipientInfo: {
    name: string;
    address: string;
    contact: string;
    country: string;
  };
  senderInfo: {
    name: string;
    address: string;
    contact: string;
  };
  shipmentDetails: {
    weight: number;
    dimensions: string;
    packageCount: number;
    items: string[];
    declaredValue: number;
  };
  trackingURL: string;
  status: string;
  createdAt: string;
  isPrinted: boolean;
}

export interface TrackingInfo {
  waybillNumber: string;
  carrier: string;
  shipmentStatus: string;
  estimatedDelivery: string;
  events: {
    timestamp: string;
    location: string;
    description: string;
    status: string;
  }[];
}

export interface LogisticsPartner {
  id: string;
  name: string;
  country: string;
  hasAPI: boolean;
  apiEndpoint?: string;
  apiKey?: string;
  trackingURL?: string;
  contactPerson: string;
  email: string;
  phone: string;
}
