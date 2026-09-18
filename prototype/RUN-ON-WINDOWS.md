# تشغيل نموذج YADD على لابتوبك (Windows) — خطوة بخطوة

> يعمل بدون إنترنت بعد التثبيت — مناسب للمناقشة والعرض.

## المتطلبات (تثبيت مرة واحدة)

1. **Node.js**: حمّل نسخة LTS من `https://nodejs.org` وثبّتها (Next × Next).
2. **Git**: إذا لم يكن مثبتًا، حمّله من `https://git-scm.com/download/win`.
3. تحقق من التثبيت (افتح PowerShell أو CMD واكتب):
   ```powershell
   node --version
   npm --version
   git --version
   ```
   يجب أن تطبع أرقام إصدارات بدون أخطاء.

## تحميل المشروع

إذا لم يكن المشروع عندك:

```powershell
git clone -b arena/01a0b6b0-yadd https://github.com/Yadd-SanaaUniversityGraduationProject/yadd.git
cd yadd\prototype
```

إذا كان المشروع موجودًا عندك مسبقًا:

```powershell
cd yadd
git fetch origin
git checkout arena/01a0b6b0-yadd
git pull origin arena/01a0b6b0-yadd
cd prototype
```

## التشغيل (كل مرة تريد العرض)

```powershell
npm install   # أول مرة فقط
npm run dev
```

ستظهر رسالة فيها:

```text
➜  Local:   http://localhost:5173/
```

## الفتح والاستعراض

- افتح في المتصفح: **http://localhost:5173**
- فهرس كل الشاشات: **http://localhost:5173/_index**
- للقطات نظيفة للفصل الرابع أضف `?clean=1` لأي رابط.
- الدخول يقبل **أي بيانات**، ورمز التحقق **أي ٤ أرقام**.

## العرض من الجوال (اختياري)

1. اربط الجوال واللابتوب على نفس الشبكة (Wi-Fi أو Hotspot من الجوال).
2. اعرف IP اللابتوب: في PowerShell اكتب `ipconfig` وانسخ `IPv4 Address` (مثال: `192.168.1.5`).
3. في متصفح الجوال افتح: `http://192.168.1.5:5173` (استبدل بالـ IP الخاص بك).

## إيقاف النموذج

في نافذة الأوامر اضغط `Ctrl + C`.

## مشاكل شائعة

| المشكلة | الحل |
|---|---|
| `npm` غير معروف | أعد تثبيت Node.js ثم أغلق نافذة الأوامر وافتحها من جديد |
| المنفذ 5173 مشغول | أغلق أي نسخة تعمل، أو شغّل: `npm run dev -- --port 3000` ثم افتح `http://localhost:3000` |
| صفحة بيضاء | حدّث الصفحة `Ctrl+F5`، وتأكد أن نافذة `npm run dev` ما تزال مفتوحة |
