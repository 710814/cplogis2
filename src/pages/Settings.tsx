
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

const Settings = () => {
  const [apiSettings, setApiSettings] = useState({
    enableApi: true,
    apiEndpoint: 'https://api.asiaexpresslink.com/v1',
    apiKey: 'ael_production_key',
    maxRetries: '3',
    timeout: '30'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    emailAddress: 'admin@example.com',
    smsNotifications: false,
    phoneNumber: '',
    failedDeliveryAlerts: true,
    statusChangeAlerts: true,
    newRequestAlerts: true
  });

  const [printSettings, setPrintSettings] = useState({
    autoPrint: false,
    labelSize: 'standard',
    includeLogo: true,
    defaultPrinter: 'Office Printer'
  });

  const handleApiSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApiSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">설정</h1>
          <p className="text-muted-foreground">시스템 설정을 관리하세요.</p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">일반</TabsTrigger>
            <TabsTrigger value="api">API 설정</TabsTrigger>
            <TabsTrigger value="notifications">알림</TabsTrigger>
            <TabsTrigger value="printing">인쇄</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>일반 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">언어</label>
                    <select className="w-full p-2 border rounded">
                      <option value="ko">한국어</option>
                      <option value="en">영어</option>
                      <option value="th">태국어</option>
                      <option value="vi">베트남어</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">시간대</label>
                    <select className="w-full p-2 border rounded">
                      <option value="Asia/Seoul">아시아/서울 (GMT+9)</option>
                      <option value="Asia/Bangkok">아시아/방콕 (GMT+7)</option>
                      <option value="Asia/Singapore">아시아/싱가포르 (GMT+8)</option>
                      <option value="Asia/Ho_Chi_Minh">아시아/호치민 (GMT+7)</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">자동 로그아웃 시간</label>
                    <select className="p-2 border rounded">
                      <option value="30">30분</option>
                      <option value="60">1시간</option>
                      <option value="120">2시간</option>
                      <option value="240">4시간</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">데이터 자동 새로고침</label>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-xs text-muted-foreground">시스템에서 데이터를 자동으로 새로고침합니다.</p>
                </div>

                <Button>설정 저장</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API 연결 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">API 활성화</label>
                    <Switch 
                      checked={apiSettings.enableApi}
                      onCheckedChange={(checked) => setApiSettings(prev => ({ ...prev, enableApi: checked }))}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">협력 물류사 API 연결을 활성화합니다.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">API 엔드포인트</label>
                  <Input 
                    disabled={!apiSettings.enableApi}
                    name="apiEndpoint"
                    value={apiSettings.apiEndpoint}
                    onChange={handleApiSettingChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">API 키</label>
                  <Input 
                    type="password"
                    disabled={!apiSettings.enableApi}
                    name="apiKey"
                    value={apiSettings.apiKey}
                    onChange={handleApiSettingChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">최대 재시도 횟수</label>
                    <Input 
                      type="number"
                      disabled={!apiSettings.enableApi}
                      name="maxRetries"
                      value={apiSettings.maxRetries}
                      onChange={handleApiSettingChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">타임아웃 (초)</label>
                    <Input 
                      type="number"
                      disabled={!apiSettings.enableApi}
                      name="timeout"
                      value={apiSettings.timeout}
                      onChange={handleApiSettingChange}
                    />
                  </div>
                </div>

                <Button disabled={!apiSettings.enableApi}>API 설정 저장</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>알림 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">이메일 알림</label>
                      <Switch 
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                      />
                    </div>
                    
                    {notificationSettings.emailNotifications && (
                      <div className="pt-2">
                        <label className="text-xs text-muted-foreground">이메일 주소</label>
                        <Input 
                          name="emailAddress"
                          value={notificationSettings.emailAddress}
                          onChange={handleNotificationSettingChange}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">SMS 알림</label>
                      <Switch 
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))}
                      />
                    </div>
                    
                    {notificationSettings.smsNotifications && (
                      <div className="pt-2">
                        <label className="text-xs text-muted-foreground">휴대폰 번호</label>
                        <Input 
                          name="phoneNumber"
                          value={notificationSettings.phoneNumber}
                          onChange={handleNotificationSettingChange}
                          placeholder="+82 10-1234-5678"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">알림 유형</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">새 배송요청</label>
                      <Switch 
                        checked={notificationSettings.newRequestAlerts}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, newRequestAlerts: checked }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">배송상태 변경</label>
                      <Switch 
                        checked={notificationSettings.statusChangeAlerts}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, statusChangeAlerts: checked }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">배송 실패</label>
                      <Switch 
                        checked={notificationSettings.failedDeliveryAlerts}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, failedDeliveryAlerts: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Button>알림 설정 저장</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="printing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>인쇄 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">자동 인쇄</label>
                    <Switch 
                      checked={printSettings.autoPrint}
                      onCheckedChange={(checked) => setPrintSettings(prev => ({ ...prev, autoPrint: checked }))}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">송장 생성시 자동으로 인쇄합니다.</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">기본 프린터</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={printSettings.defaultPrinter}
                    onChange={(e) => setPrintSettings(prev => ({ ...prev, defaultPrinter: e.target.value }))}
                  >
                    <option value="Office Printer">사무실 프린터</option>
                    <option value="Label Printer">라벨 프린터</option>
                    <option value="Warehouse Printer">물류창고 프린터</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">라벨 크기</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={printSettings.labelSize}
                    onChange={(e) => setPrintSettings(prev => ({ ...prev, labelSize: e.target.value }))}
                  >
                    <option value="standard">표준 (100mm x 150mm)</option>
                    <option value="large">대형 (120mm x 180mm)</option>
                    <option value="small">소형 (80mm x 120mm)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">로고 포함</label>
                    <Switch 
                      checked={printSettings.includeLogo}
                      onCheckedChange={(checked) => setPrintSettings(prev => ({ ...prev, includeLogo: checked }))}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">송장에 회사 로고를 표시합니다.</p>
                </div>

                <Button>인쇄 설정 저장</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
