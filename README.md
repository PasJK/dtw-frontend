
## ขั้นตอนการติดตั้ง

### 1. การติดตั้ง Package
เลือกใช้คำสั่งใดคำสั่งหนึ่งต่อไปนี้:

```bash
# yarn
yarn install
# หรือแบบย่อ
yarn
```

```bash
# npm
npm install
```

### การเรียกใช้งานหน้าเว็บ
1. build code เพื่อเตรียมใช้งานหน้าเว็บ
```bash
# yarn
yarn build
```
```bash
# npm
npm run build
```
2. เรียกใช้งานหน้าเว็บ
```bash
# yarn
yarn dev หรือ yarn start
```
```bash
# npm
npm run dev หรือ npm run start
```

```bash
# เข้าสู่ระบบ
http://localhost:3000/
```





## โครงสร้างของ project จะอยู่ที่ `src`
โครงสร้างส่วนใหญ่ของ project จะใช้งาน MUI ร่วมกับ TailwindCSS เพื่อ Custom UI บางส่วน
```
public/
└── assets/        # รูปภาพ, ไอคอน และไฟล์ static อื่นๆ
src/
├── components/    # React Components ต่างๆ ที่ใช้ในโปรเจค
├── pages/         # หน้าต่างๆ ของแอพพลิเคชั่น
├── configs/       # การกำหนดค่าเริ่มต้นของโปรเจค
├── hooks/         # การสร้าง custom hook
├── services/      # Logic สำหรับติดต่อกับ API หรือ Business Logic
├── utils/         # Utility functions ที่ใช้งานร่วมกันในโปรเจค
├── styles/        # ไฟล์ CSS

```

### รายละเอียดแต่ละโฟลเดอร์

- **components**: เก็บ React Components ที่สามารถนำกลับมาใช้ซ้ำได้
- **pages**: เก็บหน้าต่างๆ ของแอพพลิเคชั่น โดยแต่ละโฟลเดอร์ หรือ ไฟล์จะแทนหนึ่งหน้า
- **services**: เก็บการเชื่อมต่อ API
- **utils**: เก็บฟังก์ชันที่ใช้งานร่วมกันทั้งโปรเจค
- **styles**: เก็บไฟล์ที่เกี่ยวข้องกับการจัดการ style ของแอพพลิเคชั่น
- **assets**: เก็บไฟล์ static เช่น รูปภาพ, ไอคอน, fonts เป็นต้น


## Package ที่ใช้
- `@mui/material` สำหรับการสร้าง UI ของแอพพลิเคชั่น
- `@mui/icons-material` สำหรับการใช้งาน Icons ของ Material UI
- `mui-chips-input` สำหรับการสร้าง Chips Input ของ Material UI
- `reduxjs/toolkit` สำหรับการสร้าง Redux Store ของแอพพลิเคชั่น
- `@reduxjs/toolkit/query/react` สำหรับการเชื่อมต่อกับ API ของแอพพลิเคชั่น
- `tailwindcss` สำหรับปรับแต่งหน้าต่างเว็บ
- `prettier` สำหรับการจัดรูปแบบโค้ด
- `eslint` สำหรับการตรวจสอบโค้ด
- `husky` สำหรับการตรวจสอบโค้ดก่อนที่จะ push ไปยัง repository
- `eslint-config-airbnb` สำหรับการตรวจสอบโค้ดตามมาตรฐาน AirBnb
- `eslint-config-prettier` สำหรับการตรวจสอบโค้ดตามมาตรฐาน Prettier
