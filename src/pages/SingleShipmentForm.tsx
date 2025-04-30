import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

const SingleShipmentForm = () => {
  return (
    <div className="space-y-8">
      {/* 1. 개별 배송 등록 - 상품 */}
      <section className="bg-muted rounded-xl p-6 border">
        <h2 className="text-xl font-bold mb-4">개별 배송 등록</h2>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-lg font-semibold flex items-center gap-2">
            <span className="inline-block bg-primary/10 rounded-full p-2 mr-2">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#233A6F"/><path d="M7 9.5V7.8c0-.504.396-.9.9-.9h7.2c.504 0 .9.396.9.9v1.7M7 9.5v6.7c0 .504.396.9.9.9h7.2c.504 0 .9-.396.9-.9V9.5M7 9.5h10M9.5 13.5h5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            상품 (Items)
          </span>
          <Button variant="outline" className="ml-auto">상품추가(+ADD ITEM)</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md">
            <thead>
              <tr className="border-b">
                <th className="px-2 py-2"></th>
                <th className="px-2 py-2 text-sm font-semibold">상품명</th>
                <th className="px-2 py-2 text-sm font-semibold">수량(EA,PCS)</th>
                <th className="px-2 py-2 text-sm font-semibold">무게(kg)</th>
                <th className="px-2 py-2 text-sm font-semibold">통화(Currency)</th>
                <th className="px-2 py-2 text-sm font-semibold">상품가격(Unit Price)</th>
                <th className="px-2 py-2 text-sm font-semibold">HS CODE</th>
                <th className="px-2 py-2 text-sm font-semibold">합계(Amount)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-2"><Checkbox /></td>
                <td className="px-2 py-2"><Input placeholder="상품명" /></td>
                <td className="px-2 py-2"><Input placeholder="수량" type="number" /></td>
                <td className="px-2 py-2"><Input placeholder="무게" type="number" /></td>
                <td className="px-2 py-2"><Input placeholder="통화" /></td>
                <td className="px-2 py-2"><Input placeholder="단가" type="number" /></td>
                <td className="px-2 py-2"><Input placeholder="HS CODE" /></td>
                <td className="px-2 py-2">0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Button variant="destructive">선택삭제</Button>
          <span className="font-semibold">합계(Amount) <span className="ml-2">0</span></span>
        </div>
      </section>

      {/* 2. 포장 */}
      <section className="bg-muted rounded-xl p-6 border">
        <h2 className="text-xl font-bold mb-4">포장</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center mb-2">
          <div className="flex gap-2 items-center w-full md:w-auto">
            <span>부피 (Dimention)</span>
            <Input placeholder="가로(cm)" className="w-28" />
            <span>x</span>
            <Input placeholder="세로(cm)" className="w-28" />
            <span>x</span>
            <Input placeholder="높이(cm)" className="w-28" />
          </div>
          <div className="flex-1 w-full md:w-auto">
            <Input placeholder="무게(kg)" className="w-40" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          배송비는 부피와 중량을 기준으로 계산이 됩니다. 정확한 정보를 입력해주시기 바랍니다.<br />
          입력된 정보와 실제 측정정보가 다를 경우, 추가 비용이 발생할 수 있으며, 배송 지연의 원인이 될 수 있습니다.
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-center mb-2">
          <div className="flex-1">
            <Select>
              <SelectTrigger className="w-full md:w-60">
                <SelectValue placeholder="발송목적 (Export Purpose)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gift">선물</SelectItem>
                <SelectItem value="sale">판매</SelectItem>
                <SelectItem value="sample">샘플</SelectItem>
                <SelectItem value="personal">개인용</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="battery" />
            <label htmlFor="battery" className="text-sm">포장내 배터리(Battery)가 포함되어 있습니다.</label>
          </div>
        </div>
      </section>

      {/* 3. 보내는 사람 */}
      <section className="bg-muted rounded-xl p-6 border">
        <h2 className="text-xl font-bold mb-4">보내는 사람</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="이름" />
          <Input placeholder="연락처" />
          <Input placeholder="주소" className="md:col-span-2" />
          <Input placeholder="이메일" />
          <Input placeholder="우편번호" />
        </div>
      </section>

      {/* 4. 받는 사람 */}
      <section className="bg-muted rounded-xl p-6 border">
        <h2 className="text-xl font-bold mb-4">받는 사람</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="이름" />
          <Input placeholder="연락처" />
          <Input placeholder="주소" className="md:col-span-2" />
          <Input placeholder="이메일" />
          <Input placeholder="우편번호" />
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="도착국가" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KR">대한민국</SelectItem>
              <SelectItem value="US">미국</SelectItem>
              <SelectItem value="CN">중국</SelectItem>
              <SelectItem value="JP">일본</SelectItem>
              <SelectItem value="VN">베트남</SelectItem>
              <SelectItem value="TH">태국</SelectItem>
              <SelectItem value="SG">싱가포르</SelectItem>
              <SelectItem value="MY">말레이시아</SelectItem>
              {/* 필요시 국가 추가 */}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* 5. 세관신고 */}
      <section className="bg-muted rounded-xl p-6 border">
        <h2 className="text-xl font-bold mb-4">세관신고</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-2">
          <div className="flex items-center gap-2">
            <input type="radio" name="customs" id="신고진행" defaultChecked className="accent-primary" />
            <label htmlFor="신고진행" className="text-sm">신고진행</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="radio" name="customs" id="자체신고" className="accent-primary" />
            <label htmlFor="자체신고" className="text-sm">자체신고</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="radio" name="customs" id="미신고" className="accent-primary" />
            <label htmlFor="미신고" className="text-sm">미신고</label>
          </div>
        </div>
        <p className="text-xs text-red-500 mb-2">* 수출신고 총액이 400만원 이상일 경우 신고는 의무입니다.<br />400만원(FOB기준) 이하 전자상거래 수출은 신고 의무는 없으나 다양한 혜택이 있습니다.</p>
        <Button variant="outline" className="mb-2">양식 다운로드</Button>
        <div className="flex gap-4 items-center mb-2">
          <div className="flex items-center gap-2">
            <input type="radio" name="incoterms" id="DDP" />
            <label htmlFor="DDP" className="text-sm">DDP (Delivered Duty Paid) <span className="text-red-500">관부가세 판매자 부담</span></label>
          </div>
          <div className="flex items-center gap-2">
            <input type="radio" name="incoterms" id="DAP" defaultChecked />
            <label htmlFor="DAP" className="text-sm">DAP (Delivered At Place) <span className="text-blue-500">관부가세 구매자 부담</span></label>
          </div>
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-60">
            <SelectValue placeholder="통관 유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gift">선물</SelectItem>
            <SelectItem value="document">서류</SelectItem>
            <SelectItem value="sample">샘플</SelectItem>
            <SelectItem value="commercial">상업용</SelectItem>
          </SelectContent>
        </Select>
        <div className="border-dashed border-2 border-gray-300 rounded-md p-4 mt-2 text-center">
          <Button variant="outline">파일 선택</Button>
          <div className="text-xs text-muted-foreground mt-2">파일을 선택하거나 이곳에 끌어다 놓으세요</div>
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-60">
            <SelectValue placeholder="배송 업체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ems">EMS</SelectItem>
            <SelectItem value="ups">UPS</SelectItem>
            <SelectItem value="dhl">DHL</SelectItem>
            <SelectItem value="fedex">FEDEX</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* 6. 반품주소 */}
      <section className="bg-muted rounded-xl p-6 border">
        <h2 className="text-xl font-bold mb-4">반품주소</h2>
        <div className="flex items-center mb-2">
          <Checkbox id="sameAsSender" />
          <label htmlFor="sameAsSender" className="ml-2 text-sm">보내는 사람 주소와 동일</label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="이름" />
          <Input placeholder="연락처" />
          <Input placeholder="주소" className="md:col-span-2" />
          <Input placeholder="우편번호" />
        </div>
      </section>

      {/* 7. 메모 */}
      <section className="bg-muted rounded-xl p-6 border">
        <h2 className="text-xl font-bold mb-4">메모</h2>
        <Textarea placeholder="메모를 입력하세요" className="w-full min-h-[80px]" />
      </section>

      {/* 배송요청등록 버튼 */}
      <div className="flex justify-end">
        <Button className="px-8 py-3 text-lg font-bold">배송요청등록</Button>
      </div>
    </div>
  );
};

export default SingleShipmentForm; 