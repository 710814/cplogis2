import { ShipmentRequest, Waybill, TrackingInfo, LogisticsPartner } from '@/types/shipment';
import { User } from '@/types/user';

export const mockShipments: ShipmentRequest[] = [
  {
    id: 'SHP-001',
    requestDate: '2025-04-20T09:30:00',
    senderName: '서울 물류 센터',
    senderAddress: '서울특별시 강남구 테헤란로 123',
    senderContact: '02-1234-5678',
    recipientName: 'John Smith',
    recipientAddress: '123 Main St, Bangkok 10330',
    recipientContact: '+66 2 123 4567',
    country: 'Thailand',
    items: [
      {
        description: 'Electronics - Smartphone',
        quantity: 2,
        weight: 0.5,
        value: 1200,
      },
      {
        description: 'Clothing - T-shirts',
        quantity: 10,
        weight: 1.5,
        value: 300,
      },
    ],
    totalWeight: 2.0,
    status: 'pending',
    logisticsPartner: 'Thai Express Logistics',
    createdAt: '2025-04-20T09:30:00',
  },
  {
    id: 'SHP-002',
    requestDate: '2025-04-19T14:15:00',
    senderName: '부산 물류 센터',
    senderAddress: '부산광역시 해운대구 센텀동로 100',
    senderContact: '051-9876-5432',
    recipientName: 'Maria Garcia',
    recipientAddress: '456 Orchard Rd, Singapore 238877',
    recipientContact: '+65 6123 4567',
    country: 'Singapore',
    items: [
      {
        description: 'Cosmetics - Skincare set',
        quantity: 5,
        weight: 2.5,
        value: 750,
      },
    ],
    totalWeight: 2.5,
    status: 'processed',
    logisticsPartner: 'Singapore Fast Delivery',
    waybillNumber: 'SFD283917465',
    createdAt: '2025-04-19T14:15:00',
  },
  {
    id: 'SHP-003',
    requestDate: '2025-04-18T11:45:00',
    senderName: '인천 물류 센터',
    senderAddress: '인천광역시 연수구 송도과학로 123',
    senderContact: '032-8765-4321',
    recipientName: 'Nguyen Van Tran',
    recipientAddress: '789 Le Loi St, Ho Chi Minh City',
    recipientContact: '+84 28 3823 9999',
    country: 'Vietnam',
    items: [
      {
        description: 'Food - Instant noodles',
        quantity: 50,
        weight: 15.0,
        value: 250,
      },
      {
        description: 'Snacks - Variety pack',
        quantity: 20,
        weight: 10.0,
        value: 300,
      },
    ],
    totalWeight: 25.0,
    status: 'completed',
    logisticsPartner: 'Vietnam Delivery Express',
    waybillNumber: 'VDE789012345',
    createdAt: '2025-04-18T11:45:00',
  },
  {
    id: 'SHP-004',
    requestDate: '2025-04-17T16:20:00',
    senderName: '대전 물류 센터',
    senderAddress: '대전광역시 유성구 대학로 99',
    senderContact: '042-3456-7890',
    recipientName: 'Ahmad Abdullah',
    recipientAddress: '101 Jalan Bukit Bintang, Kuala Lumpur 55100',
    recipientContact: '+60 3 2145 6789',
    country: 'Malaysia',
    items: [
      {
        description: 'Books - Korean language',
        quantity: 30,
        weight: 15.0,
        value: 600,
      },
    ],
    totalWeight: 15.0,
    status: 'cancelled',
    logisticsPartner: 'Malaysia Post Service',
    createdAt: '2025-04-17T16:20:00',
  },
  {
    id: 'SHP-005',
    requestDate: '2025-04-16T10:10:00',
    senderName: '광주 물류 센터',
    senderAddress: '광주광역시 서구 상무민주로 123',
    senderContact: '062-6789-0123',
    recipientName: 'Supachai Rattanapol',
    recipientAddress: '55 Sukhumvit Soi 11, Bangkok 10110',
    recipientContact: '+66 2 345 6789',
    country: 'Thailand',
    items: [
      {
        description: 'Beauty products - Makeup kit',
        quantity: 10,
        weight: 5.0,
        value: 1500,
      },
      {
        description: 'Skincare - Face masks',
        quantity: 100,
        weight: 3.0,
        value: 500,
      },
    ],
    totalWeight: 8.0,
    status: 'processed',
    logisticsPartner: 'Thai Express Logistics',
    waybillNumber: 'TEL123456789',
    createdAt: '2025-04-16T10:10:00',
  }
];

export const mockWaybills: Waybill[] = [
  {
    id: 'WB-001',
    waybillNumber: 'SFD283917465',
    shipmentRequestId: 'SHP-002',
    logisticsPartner: 'Singapore Fast Delivery',
    recipientInfo: {
      name: 'Maria Garcia',
      address: '456 Orchard Rd, Singapore 238877',
      contact: '+65 6123 4567',
      country: 'Singapore'
    },
    senderInfo: {
      name: '부산 물류 센터',
      address: '부산광역시 해운대구 센텀동로 100',
      contact: '051-9876-5432'
    },
    shipmentDetails: {
      weight: 2.5,
      dimensions: '30x20x15 cm',
      packageCount: 1,
      items: ['Cosmetics - Skincare set (5)'],
      declaredValue: 750
    },
    trackingURL: 'https://track.singaporefastdelivery.com?number=SFD283917465',
    status: 'In Transit',
    createdAt: '2025-04-19T15:30:00',
    isPrinted: true
  },
  {
    id: 'WB-002',
    waybillNumber: 'VDE789012345',
    shipmentRequestId: 'SHP-003',
    logisticsPartner: 'Vietnam Delivery Express',
    recipientInfo: {
      name: 'Nguyen Van Tran',
      address: '789 Le Loi St, Ho Chi Minh City',
      contact: '+84 28 3823 9999',
      country: 'Vietnam'
    },
    senderInfo: {
      name: '인천 물류 센터',
      address: '인천광역시 연수구 송도과학로 123',
      contact: '032-8765-4321'
    },
    shipmentDetails: {
      weight: 25.0,
      dimensions: '60x40x35 cm',
      packageCount: 3,
      items: ['Food - Instant noodles (50)', 'Snacks - Variety pack (20)'],
      declaredValue: 550
    },
    trackingURL: 'https://tracking.vne.com.vn?waybill=VDE789012345',
    status: 'Delivered',
    createdAt: '2025-04-18T12:45:00',
    isPrinted: true
  },
  {
    id: 'WB-003',
    waybillNumber: 'TEL123456789',
    shipmentRequestId: 'SHP-005',
    logisticsPartner: 'Thai Express Logistics',
    recipientInfo: {
      name: 'Supachai Rattanapol',
      address: '55 Sukhumvit Soi 11, Bangkok 10110',
      contact: '+66 2 345 6789',
      country: 'Thailand'
    },
    senderInfo: {
      name: '광주 물류 센터',
      address: '광주광역시 서구 상무민주로 123',
      contact: '062-6789-0123'
    },
    shipmentDetails: {
      weight: 8.0,
      dimensions: '45x30x25 cm',
      packageCount: 2,
      items: ['Beauty products - Makeup kit (10)', 'Skincare - Face masks (100)'],
      declaredValue: 2000
    },
    trackingURL: 'https://thaiexpress.co.th/track?id=TEL123456789',
    status: 'Processing',
    createdAt: '2025-04-16T11:20:00',
    isPrinted: false
  }
];

export const mockTrackingInfo: Record<string, TrackingInfo> = {
  'SFD283917465': {
    waybillNumber: 'SFD283917465',
    carrier: 'Singapore Fast Delivery',
    shipmentStatus: 'In Transit',
    estimatedDelivery: '2025-04-27',
    events: [
      {
        timestamp: '2025-04-19T16:00:00',
        location: 'Busan, Korea',
        description: 'Shipment picked up',
        status: 'Picked Up'
      },
      {
        timestamp: '2025-04-20T10:30:00',
        location: 'Incheon, Korea',
        description: 'Arrived at export facility',
        status: 'In Transit'
      },
      {
        timestamp: '2025-04-21T14:15:00',
        location: 'Incheon, Korea',
        description: 'Departed from origin country',
        status: 'In Transit'
      },
      {
        timestamp: '2025-04-22T08:45:00',
        location: 'Singapore',
        description: 'Arrived at destination country',
        status: 'In Transit'
      },
      {
        timestamp: '2025-04-23T11:20:00',
        location: 'Singapore',
        description: 'Customs clearance completed',
        status: 'In Transit'
      }
    ]
  },
  'VDE789012345': {
    waybillNumber: 'VDE789012345',
    carrier: 'Vietnam Delivery Express',
    shipmentStatus: 'Delivered',
    estimatedDelivery: '2025-04-20',
    events: [
      {
        timestamp: '2025-04-18T13:00:00',
        location: 'Incheon, Korea',
        description: 'Shipment picked up',
        status: 'Picked Up'
      },
      {
        timestamp: '2025-04-18T17:45:00',
        location: 'Incheon, Korea',
        description: 'Departed from origin country',
        status: 'In Transit'
      },
      {
        timestamp: '2025-04-19T09:30:00',
        location: 'Ho Chi Minh City, Vietnam',
        description: 'Arrived at destination country',
        status: 'In Transit'
      },
      {
        timestamp: '2025-04-19T14:00:00',
        location: 'Ho Chi Minh City, Vietnam',
        description: 'Customs clearance completed',
        status: 'In Transit'
      },
      {
        timestamp: '2025-04-20T09:15:00',
        location: 'Ho Chi Minh City, Vietnam',
        description: 'Out for delivery',
        status: 'Out for Delivery'
      },
      {
        timestamp: '2025-04-20T15:40:00',
        location: 'Ho Chi Minh City, Vietnam',
        description: 'Delivered to recipient',
        status: 'Delivered'
      }
    ]
  },
  'TEL123456789': {
    waybillNumber: 'TEL123456789',
    carrier: 'Thai Express Logistics',
    shipmentStatus: 'Processing',
    estimatedDelivery: '2025-04-28',
    events: [
      {
        timestamp: '2025-04-16T11:30:00',
        location: 'Gwangju, Korea',
        description: 'Shipment information received',
        status: 'Processing'
      }
    ]
  }
};

export const mockLogisticsPartners: LogisticsPartner[] = [
  {
    id: 'LP-001',
    name: 'Thai Express Logistics',
    country: 'Thailand',
    hasAPI: true,
    apiEndpoint: 'https://api.thaiexpress.co.th/v1',
    apiKey: 'thai_express_api_key_123',
    trackingURL: 'https://thaiexpress.co.th/track?id={trackingNumber}',
    contactPerson: 'Somchai Jaidee',
    email: 'partnership@thaiexpress.co.th',
    phone: '+66 2 123 4567'
  },
  {
    id: 'LP-002',
    name: 'Singapore Fast Delivery',
    country: 'Singapore',
    hasAPI: true,
    apiEndpoint: 'https://api.singaporefastdelivery.com/v2',
    apiKey: 'sfastdelivery_api_key_456',
    trackingURL: 'https://track.singaporefastdelivery.com?number={trackingNumber}',
    contactPerson: 'Tan Wei Ling',
    email: 'operations@singaporefastdelivery.com',
    phone: '+65 6123 4567'
  },
  {
    id: 'LP-003',
    name: 'Vietnam Delivery Express',
    country: 'Vietnam',
    hasAPI: false,
    trackingURL: 'https://tracking.vne.com.vn?waybill={trackingNumber}',
    contactPerson: 'Nguyen Minh Tuan',
    email: 'partnerships@vnexpress.vn',
    phone: '+84 28 3823 9999'
  },
  {
    id: 'LP-004',
    name: 'Malaysia Post Service',
    country: 'Malaysia',
    hasAPI: false,
    trackingURL: 'https://track.malaysiapost.com.my/?tracking_number={trackingNumber}',
    contactPerson: 'Ahmad Razak',
    email: 'business@malaysiapost.com.my',
    phone: '+60 3 2145 6789'
  },
  {
    id: 'LP-005',
    name: 'Indonesia Cargo Express',
    country: 'Indonesia',
    hasAPI: true,
    apiEndpoint: 'https://api.indonesiacargo.co.id/v1',
    apiKey: 'indo_cargo_api_key_789',
    trackingURL: 'https://indonesiacargo.co.id/tracking?number={trackingNumber}',
    contactPerson: 'Budi Santoso',
    email: 'operations@indonesiacargo.co.id',
    phone: '+62 21 2345 6789'
  }
];

export const mockUsers: User[] = [
  {
    id: 'USR-001',
    username: 'admin',
    name: '관리자',
    email: 'admin@asiaexpresslink.com',
    role: 'admin',
    department: '관리부',
    isActive: true,
    lastLogin: '2025-04-21T08:30:00',
    createdAt: '2025-01-01T00:00:00'
  },
  {
    id: 'USR-002',
    username: 'kim.manager',
    name: '김관리',
    email: 'kim.manager@asiaexpresslink.com',
    role: 'manager',
    department: '운영부',
    isActive: true,
    lastLogin: '2025-04-20T14:15:00',
    createdAt: '2025-01-15T00:00:00'
  },
  {
    id: 'USR-003',
    username: 'lee.staff',
    name: '이직원',
    email: 'lee.staff@asiaexpresslink.com',
    role: 'staff',
    department: '물류부',
    isActive: true,
    lastLogin: '2025-04-21T09:45:00',
    createdAt: '2025-02-10T00:00:00'
  },
  {
    id: 'USR-004',
    username: 'park.staff',
    name: '박담당',
    email: 'park.staff@asiaexpresslink.com',
    role: 'staff',
    department: '고객지원부',
    isActive: true,
    lastLogin: '2025-04-19T16:30:00',
    createdAt: '2025-03-05T00:00:00'
  },
  {
    id: 'USR-005',
    username: 'jung.manager',
    name: '정관리',
    email: 'jung.manager@asiaexpresslink.com',
    role: 'manager',
    department: '영업부',
    isActive: false,
    lastLogin: '2025-03-15T11:20:00',
    createdAt: '2025-02-20T00:00:00'
  }
];
