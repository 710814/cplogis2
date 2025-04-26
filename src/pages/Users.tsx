import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockUsers } from '@/data/mockData';
import { User } from '@/types/user';
import { Edit, Plus, Search, Trash, UserCog } from 'lucide-react';
import { format } from 'date-fns';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // 필터링된 사용자 목록
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  // 사용자 추가/수정 모달 열기
  const handleAddUser = () => {
    setIsEditing(false);
    setSelectedUser(null);
    setUserDialogOpen(true);
  };

  // 사용자 수정 모달 열기
  const handleEditUser = (user: User) => {
    setIsEditing(true);
    setSelectedUser(user);
    setUserDialogOpen(true);
  };

  // 사용자 삭제 모달 열기
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  // 사용자 추가/수정 제출 처리
  const handleSubmitUser = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현에서는 API 호출로 사용자 추가/수정
    setUserDialogOpen(false);
  };

  // 사용자 삭제 처리
  const handleConfirmDelete = () => {
    // 실제 구현에서는 API 호출로 사용자 삭제
    setDeleteDialogOpen(false);
  };

  // 역할에 따른 배지 색상
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'manager':
        return 'bg-green-100 text-green-800';
      case 'staff':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 역할 한글 표시
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return '관리자';
      case 'manager':
        return '매니저';
      case 'staff':
        return '직원';
      default:
        return role;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">사용자관리</h1>
          <p className="text-muted-foreground">시스템 사용자를 관리합니다.</p>
        </div>

        {/* 검색 및 필터링 */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="검색 (이름, 이메일, 부서)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="w-40">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="역할 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 역할</SelectItem>
                  <SelectItem value="admin">관리자</SelectItem>
                  <SelectItem value="manager">매니저</SelectItem>
                  <SelectItem value="staff">직원</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddUser}>
              <Plus className="h-4 w-4 mr-2" />
              사용자 추가
            </Button>
          </div>
        </div>

        {/* 사용자 목록 테이블 */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사용자명</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>부서</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>최근 로그인</TableHead>
                <TableHead className="text-right">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div>{user.name}</div>
                      <div className="text-xs text-muted-foreground">@{user.username}</div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block ${getRoleBadgeColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                        user.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? '활성' : '비활성'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.lastLogin ? format(new Date(user.lastLogin), 'yyyy-MM-dd HH:mm') : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDeleteUser(user)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 사용자 추가/수정 대화 상자 */}
      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? '사용자 정보 수정' : '새 사용자 추가'}</DialogTitle>
            <DialogDescription>
              {isEditing ? '사용자 정보를 수정합니다.' : '시스템에 새 사용자를 추가합니다.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitUser}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="username" className="text-right">아이디</label>
                <Input
                  id="username"
                  defaultValue={selectedUser?.username || ''}
                  className="col-span-3"
                  placeholder="사용자 ID"
                  required
                />
              </div>
              {!isEditing && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="password" className="text-right">비밀번호</label>
                  <Input
                    id="password"
                    type="password"
                    className="col-span-3"
                    placeholder="초기 비밀번호"
                    required={!isEditing}
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">이름</label>
                <Input
                  id="name"
                  defaultValue={selectedUser?.name || ''}
                  className="col-span-3"
                  placeholder="사용자 이름"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">이메일</label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={selectedUser?.email || ''}
                  className="col-span-3"
                  placeholder="이메일 주소"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="department" className="text-right">부서</label>
                <Input
                  id="department"
                  defaultValue={selectedUser?.department || ''}
                  className="col-span-3"
                  placeholder="소속 부서"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="role" className="text-right">역할</label>
                <Select defaultValue={selectedUser?.role || 'staff'}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="역할 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">관리자</SelectItem>
                    <SelectItem value="manager">매니저</SelectItem>
                    <SelectItem value="staff">직원</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="isActive" className="text-right">상태</label>
                <Select defaultValue={selectedUser?.isActive ? 'active' : 'inactive'}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">활성</SelectItem>
                    <SelectItem value="inactive">비활성</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">저장</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 사용자 삭제 확인 대화 상자 */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>사용자 삭제</DialogTitle>
            <DialogDescription>
              {selectedUser?.name} 사용자를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Users;
