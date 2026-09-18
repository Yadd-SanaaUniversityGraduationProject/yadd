import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen, TopBar } from '../components/Shell.jsx';
import Icon from '../components/Icon.jsx';

const NAMES = {
  'SH-02': 'المحادثة الخاصة',
  'TRX-01': 'تأكيد بدء المعاملة',
  'TRX-02': 'تفاصيل المعاملة',
  'TRX-03': 'معاملاتي',
  'INV-01': 'إنشاء / مراجعة الفاتورة',
  'INV-02': 'مراجعة الفاتورة',
  'RAT-01': 'تقييم المقدم',
  'RAT-02': 'تقييم المستفيد',
  'PRO-06': 'إدارة ملف المقدم',
  'PRO-07': 'إدارة معرض الأعمال',
  'PRO-08': 'إدارة الكتالوج',
  'PRO-09': 'حالة التحقق من الهوية',
  'PRO-10': 'تقديم التحقق من الهوية',
  'PRO-11': 'الاشتراك / التجديد',
  'SAFE-01': 'حظر مستخدم',
  'SAFE-02': 'الإبلاغ',
};

// Honest placeholder for P1 scope — keeps P0 navigation unbroken.
export default function Soon() {
  const { id } = useParams();
  const nav = useNavigate();
  return (
    <Screen id={id || 'P1'} name={NAMES[id] || 'الدفعة القادمة'}>
      <TopBar title={NAMES[id] || 'قريبًا'} back={-1} />
      <div className="empty">
        <span className="cat-ic" style={{ margin: '0 auto' }}><Icon name="clock" size={26} /></span>
        <div className="big mt12">{NAMES[id] || 'هذه الشاشة'} — الدفعة P1</div>
        <p className="small">خارج نطاق P0 الحالي. العقد الوظيفي معتمد في المواصفات وسيُبنى في الدفعة القادمة.</p>
        <button className="btn btn-secondary mt16" onClick={() => nav(-1)}>
          رجوع
        </button>
      </div>
    </Screen>
  );
}
