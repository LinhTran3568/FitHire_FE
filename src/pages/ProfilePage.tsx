import { Button, Input, SectionTitle, SurfaceCard } from '@components/ui';
import { useAuthStore } from '@features/auth/store/authStore';
import {
  BadgeCheck,
  Camera,
  KeyRound,
  Lock,
  Mail,
  Save,
  ShieldCheck,
  User,
  UserCircle,
} from 'lucide-react';
import { useRef, useState } from 'react';

const ROLE_LABEL: Record<string, string> = {
  admin: 'Quản trị viên',
  user: 'Ứng viên',
  guest: 'Khách',
};

const ROLE_COLOR: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700',
  user: 'bg-blue-100 text-blue-700',
  guest: 'bg-slate-100 text-slate-600',
};

export default function ProfilePage() {
  const user = useAuthStore(state => state.user);
  const setAuth = useAuthStore(state => state.setAuth);
  const accessToken = useAuthStore(state => state.accessToken);

  const [name, setName] = useState(user?.name ?? '');
  const [nameSaved, setNameSaved] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSaved, setPwSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ---------- Handlers ----------
  const handleSaveName = () => {
    if (!user || !accessToken) return;
    setAuth({ ...user, name }, accessToken);
    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 2500);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !accessToken) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const avatarUrl = ev.target?.result as string;
      setAuth({ ...user, avatarUrl }, accessToken);
    };
    reader.readAsDataURL(file);
  };

  const handleChangePassword = () => {
    setPwError('');
    if (!newPassword || !oldPassword) {
      setPwError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (newPassword.length < 6) {
      setPwError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError('Mật khẩu xác nhận không khớp.');
      return;
    }
    // TODO: call API to change password
    setPwSaved(true);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPwSaved(false), 2500);
  };

  if (!user) return null;

  const roleKey = user.role ?? 'guest';

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <SectionTitle
        title="Hồ sơ cá nhân"
        subtitle="Quản lý thông tin tài khoản và bảo mật của bạn."
      />

      {/* ── Avatar + basic info ── */}
      <SurfaceCard>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="relative shrink-0">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-24 w-24 rounded-full object-cover ring-4 ring-blue-100"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 ring-4 ring-blue-100">
                <UserCircle size={64} className="text-blue-400" />
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow transition hover:bg-blue-700"
              title="Đổi ảnh đại diện"
            >
              <Camera size={14} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Name + role badge */}
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-sm text-slate-500">{user.email}</p>
            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${ROLE_COLOR[roleKey]}`}
            >
              <ShieldCheck size={13} />
              {ROLE_LABEL[roleKey]}
            </span>
          </div>
        </div>
      </SurfaceCard>

      {/* ── Edit name ── */}
      <SurfaceCard>
        <div className="mb-5 flex items-center gap-2">
          <User size={18} className="text-blue-600" />
          <h3 className="font-semibold text-slate-800">Thông tin cá nhân</h3>
        </div>

        <div className="space-y-4">
          <Input
            label="Họ và tên"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nhập tên hiển thị"
            leftAddon={<User size={15} />}
          />

          <Input
            label="Email"
            value={user.email}
            readOnly
            leftAddon={<Mail size={15} />}
            helperText="Email không thể thay đổi."
          />

          <Input
            label="Vai trò"
            value={ROLE_LABEL[roleKey]}
            readOnly
            leftAddon={<BadgeCheck size={15} />}
          />

          <div className="flex items-center gap-3 pt-1">
            <Button
              onClick={handleSaveName}
              leftIcon={<Save size={15} />}
              disabled={name.trim() === '' || name === user.name}
            >
              Lưu thay đổi
            </Button>
            {nameSaved && (
              <span className="text-sm font-medium text-green-600">✓ Đã lưu thành công!</span>
            )}
          </div>
        </div>
      </SurfaceCard>

      {/* ── Change password ── */}
      <SurfaceCard>
        <div className="mb-5 flex items-center gap-2">
          <KeyRound size={18} className="text-blue-600" />
          <h3 className="font-semibold text-slate-800">Đổi mật khẩu</h3>
        </div>

        <div className="space-y-4">
          <Input
            label="Mật khẩu hiện tại"
            type="password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="••••••••"
            leftAddon={<Lock size={15} />}
          />
          <Input
            label="Mật khẩu mới"
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Ít nhất 6 ký tự"
            leftAddon={<Lock size={15} />}
          />
          <Input
            label="Xác nhận mật khẩu mới"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu mới"
            leftAddon={<Lock size={15} />}
            errorMessage={pwError}
          />

          <div className="flex items-center gap-3 pt-1">
            <Button
              onClick={handleChangePassword}
              leftIcon={<KeyRound size={15} />}
              variant="secondary"
            >
              Cập nhật mật khẩu
            </Button>
            {pwSaved && (
              <span className="text-sm font-medium text-green-600">✓ Đổi mật khẩu thành công!</span>
            )}
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}
