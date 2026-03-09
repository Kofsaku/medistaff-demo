import {
  Staff,
  Qualification,
  AttendanceRecord,
  MonthlyAttendance,
  LeaveRequest,
  ShiftType,
  Notification,
  DepartmentData,
  JobTypeData,
  Activity,
  ShiftCoverage,
} from '@/types';

export const staffList: Staff[] = [
  // 内科病棟 (8名: 医師2, 看護師5, 事務1)
  { id: 'EMP-001', name: '山田太郎', nameKana: 'やまだ たろう', department: '内科病棟', jobType: '医師', employmentType: '常勤', joinDate: '2015/04/01', status: '出勤', birthDate: '1980/05/15', gender: '男性', phone: '090-1234-5678', email: 't.yamada@hospital.example.jp', address: '東京都新宿区西新宿1-1-1', position: '部長' },
  { id: 'EMP-004', name: '鈴木美咲', nameKana: 'すずき みさき', department: '内科病棟', jobType: '看護師', employmentType: '常勤', joinDate: '2021/04/01', status: '出勤', birthDate: '1996/02/14', gender: '女性', phone: '090-4567-8901', email: 'm.suzuki@hospital.example.jp', address: '東京都杉並区荻窪4-4-4', position: '一般' },
  { id: 'EMP-014', name: '木村美穂', nameKana: 'きむら みほ', department: '内科病棟', jobType: '看護師', employmentType: '非常勤', joinDate: '2023/04/01', status: '出勤', birthDate: '1995/11/11', gender: '女性', phone: '090-7777-8888', email: 'm.kimura@hospital.example.jp', address: '東京都江東区亀戸14-14-14', position: '一般' },
  { id: 'EMP-016', name: '森田智子', nameKana: 'もりた ともこ', department: '内科病棟', jobType: '看護師', employmentType: '常勤', joinDate: '2019/04/01', status: '出勤', birthDate: '1991/07/22', gender: '女性', phone: '090-1616-1616', email: 't.morita@hospital.example.jp', address: '東京都品川区大井1-16-16', position: '主任' },
  { id: 'EMP-017', name: '藤井康介', nameKana: 'ふじい こうすけ', department: '内科病棟', jobType: '医師', employmentType: '常勤', joinDate: '2020/04/01', status: '出勤', birthDate: '1987/03/08', gender: '男性', phone: '090-1717-1717', email: 'k.fujii@hospital.example.jp', address: '東京都品川区戸越1-17-17', position: '医員' },
  { id: 'EMP-018', name: '岡田恵理', nameKana: 'おかだ えり', department: '内科病棟', jobType: '看護師', employmentType: '常勤', joinDate: '2022/04/01', status: '出勤', birthDate: '1998/09/15', gender: '女性', phone: '090-1818-1818', email: 'e.okada@hospital.example.jp', address: '東京都大田区池上1-18-18', position: '一般' },
  { id: 'EMP-019', name: '長谷川翼', nameKana: 'はせがわ つばさ', department: '内科病棟', jobType: '看護師', employmentType: 'パート', joinDate: '2024/01/15', status: '出勤', birthDate: '1999/12/01', gender: '男性', phone: '090-1919-1919', email: 't.hasegawa@hospital.example.jp', address: '東京都大田区矢口1-19-19', position: '一般' },
  { id: 'EMP-020', name: '上野真理', nameKana: 'うえの まり', department: '内科病棟', jobType: '事務職', employmentType: '常勤', joinDate: '2021/10/01', status: '出勤', birthDate: '1993/05/20', gender: '女性', phone: '090-2020-2020', email: 'm.ueno@hospital.example.jp', address: '東京都大田区雑色1-20-20', position: '一般' },

  // 外科病棟 (7名: 医師2, 看護師4, 技師1)
  { id: 'EMP-013', name: '井上隆', nameKana: 'いのうえ たかし', department: '外科病棟', jobType: '医師', employmentType: '常勤', joinDate: '2010/04/01', status: '出勤', birthDate: '1978/01/15', gender: '男性', phone: '090-5555-6666', email: 't.inoue@hospital.example.jp', address: '東京都墨田区錦糸町13-13-13', position: '部長' },
  { id: 'EMP-002', name: '佐藤花子', nameKana: 'さとう はなこ', department: '外科病棟', jobType: '看護師', employmentType: '常勤', joinDate: '2018/09/15', status: '出勤', birthDate: '1990/08/20', gender: '女性', phone: '090-2345-6789', email: 'h.sato@hospital.example.jp', address: '東京都渋谷区代々木2-2-2', position: '主任' },
  { id: 'EMP-021', name: '石川雄大', nameKana: 'いしかわ ゆうだい', department: '外科病棟', jobType: '医師', employmentType: '常勤', joinDate: '2017/04/01', status: '出勤', birthDate: '1984/06/12', gender: '男性', phone: '090-2121-2121', email: 'y.ishikawa@hospital.example.jp', address: '東京都江東区深川1-21-21', position: '医員' },
  { id: 'EMP-022', name: '西村由香', nameKana: 'にしむら ゆか', department: '外科病棟', jobType: '看護師', employmentType: '常勤', joinDate: '2020/04/01', status: '出勤', birthDate: '1994/11/28', gender: '女性', phone: '090-2222-2222', email: 'y.nishimura@hospital.example.jp', address: '東京都江東区豊洲1-22-22', position: '一般' },
  { id: 'EMP-023', name: '原田健太', nameKana: 'はらだ けんた', department: '外科病棟', jobType: '看護師', employmentType: '常勤', joinDate: '2021/04/01', status: '出勤', birthDate: '1997/02/05', gender: '男性', phone: '090-2323-2323', email: 'k.harada@hospital.example.jp', address: '東京都江東区東陽1-23-23', position: '一般' },
  { id: 'EMP-024', name: '村上美紀', nameKana: 'むらかみ みき', department: '外科病棟', jobType: '看護師', employmentType: '非常勤', joinDate: '2023/07/01', status: '出勤', birthDate: '1996/08/18', gender: '女性', phone: '090-2424-2424', email: 'm.murakami@hospital.example.jp', address: '東京都江東区南砂1-24-24', position: '一般' },
  { id: 'EMP-025', name: '近藤浩司', nameKana: 'こんどう こうじ', department: '外科病棟', jobType: '技師', employmentType: '常勤', joinDate: '2018/04/01', status: '出勤', birthDate: '1989/04/30', gender: '男性', phone: '090-2525-2525', email: 'k.kondo@hospital.example.jp', address: '東京都江東区木場1-25-25', position: '一般' },

  // 救急科 (6名: 医師2, 看護師4)
  { id: 'EMP-003', name: '田中一郎', nameKana: 'たなか いちろう', department: '救急科', jobType: '医師', employmentType: '常勤', joinDate: '2012/04/01', status: '出勤', birthDate: '1975/11/03', gender: '男性', phone: '090-3456-7890', email: 'i.tanaka@hospital.example.jp', address: '東京都中野区中央3-3-3', position: '科長' },
  { id: 'EMP-015', name: '斎藤翔太', nameKana: 'さいとう しょうた', department: '救急科', jobType: '看護師', employmentType: '常勤', joinDate: '2021/10/01', status: '出勤', birthDate: '1997/08/08', gender: '男性', phone: '090-9999-0000', email: 's.saito@hospital.example.jp', address: '東京都北区赤羽15-15-15', position: '一般' },
  { id: 'EMP-026', name: '前田隼人', nameKana: 'まえだ はやと', department: '救急科', jobType: '医師', employmentType: '常勤', joinDate: '2016/04/01', status: '出勤', birthDate: '1986/10/10', gender: '男性', phone: '090-2626-2626', email: 'h.maeda@hospital.example.jp', address: '東京都荒川区西日暮里1-26-26', position: '医員' },
  { id: 'EMP-027', name: '大塚理恵', nameKana: 'おおつか りえ', department: '救急科', jobType: '看護師', employmentType: '常勤', joinDate: '2019/04/01', status: '出勤', birthDate: '1992/01/25', gender: '女性', phone: '090-2727-2727', email: 'r.otsuka@hospital.example.jp', address: '東京都荒川区町屋1-27-27', position: '主任' },
  { id: 'EMP-028', name: '福田亮', nameKana: 'ふくだ りょう', department: '救急科', jobType: '看護師', employmentType: '常勤', joinDate: '2022/04/01', status: '出勤', birthDate: '1998/05/15', gender: '男性', phone: '090-2828-2828', email: 'r.fukuda@hospital.example.jp', address: '東京都荒川区東尾久1-28-28', position: '一般' },
  { id: 'EMP-029', name: '三浦彩花', nameKana: 'みうら あやか', department: '救急科', jobType: '看護師', employmentType: '非常勤', joinDate: '2023/10/01', status: '出勤', birthDate: '1995/03/12', gender: '女性', phone: '090-2929-2929', email: 'a.miura@hospital.example.jp', address: '東京都荒川区南千住1-29-29', position: '一般' },

  // 小児科 (4名)
  { id: 'EMP-008', name: '中村あかり', nameKana: 'なかむら あかり', department: '小児科', jobType: '看護師', employmentType: '非常勤', joinDate: '2022/06/01', status: '出勤', birthDate: '1994/04/18', gender: '女性', phone: '090-8901-2345', email: 'a.nakamura@hospital.example.jp', address: '東京都目黒区目黒8-8-8', position: '一般' },
  { id: 'EMP-030', name: '柴田幸子', nameKana: 'しばた さちこ', department: '小児科', jobType: '医師', employmentType: '常勤', joinDate: '2014/04/01', status: '出勤', birthDate: '1983/09/05', gender: '女性', phone: '090-3030-3030', email: 's.shibata@hospital.example.jp', address: '東京都足立区千住1-30-30', position: '科長' },
  { id: 'EMP-031', name: '野口春香', nameKana: 'のぐち はるか', department: '小児科', jobType: '看護師', employmentType: '常勤', joinDate: '2020/04/01', status: '出勤', birthDate: '1996/06/14', gender: '女性', phone: '090-3131-3131', email: 'h.noguchi@hospital.example.jp', address: '東京都足立区綾瀬1-31-31', position: '一般' },
  { id: 'EMP-032', name: '宮崎大地', nameKana: 'みやざき だいち', department: '小児科', jobType: '看護師', employmentType: '常勤', joinDate: '2022/10/01', status: '出勤', birthDate: '1999/01/20', gender: '男性', phone: '090-3232-3232', email: 'd.miyazaki@hospital.example.jp', address: '東京都足立区竹ノ塚1-32-32', position: '一般' },

  // 産婦人科 (3名)
  { id: 'EMP-010', name: '加藤真由美', nameKana: 'かとう まゆみ', department: '産婦人科', jobType: '看護師', employmentType: '常勤', joinDate: '2014/04/01', status: '出勤', birthDate: '1982/03/03', gender: '女性', phone: '090-0123-4567', email: 'm.kato@hospital.example.jp', address: '東京都大田区蒲田10-10-10', position: '師長' },
  { id: 'EMP-033', name: '内田文香', nameKana: 'うちだ ふみか', department: '産婦人科', jobType: '医師', employmentType: '常勤', joinDate: '2013/04/01', status: '出勤', birthDate: '1981/12/10', gender: '女性', phone: '090-3333-3333', email: 'f.uchida@hospital.example.jp', address: '東京都葛飾区新小岩1-33-33', position: '科長' },
  { id: 'EMP-034', name: '坂本瑞希', nameKana: 'さかもと みずき', department: '産婦人科', jobType: '看護師', employmentType: '常勤', joinDate: '2021/04/01', status: '出勤', birthDate: '1997/04/08', gender: '女性', phone: '090-3434-3434', email: 'm.sakamoto@hospital.example.jp', address: '東京都葛飾区亀有1-34-34', position: '一般' },

  // その他部門（元のまま維持）
  { id: 'EMP-005', name: '高橋誠', nameKana: 'たかはし まこと', department: '放射線科', jobType: '技師', employmentType: '常勤', joinDate: '2016/07/01', status: '出勤', birthDate: '1988/09/10', gender: '男性', phone: '090-5678-9012', email: 'm.takahashi@hospital.example.jp', address: '東京都練馬区豊玉5-5-5', position: '主任' },
  { id: 'EMP-006', name: '伊藤裕子', nameKana: 'いとう ゆうこ', department: '事務部', jobType: '事務職', employmentType: '常勤', joinDate: '2020/01/15', status: '出勤', birthDate: '1992/12/25', gender: '女性', phone: '090-6789-0123', email: 'y.ito@hospital.example.jp', address: '東京都板橋区板橋6-6-6', position: '一般' },
  { id: 'EMP-007', name: '渡辺健一', nameKana: 'わたなべ けんいち', department: '薬剤部', jobType: '薬剤師', employmentType: '常勤', joinDate: '2017/10/01', status: '休暇', birthDate: '1985/07/07', gender: '男性', phone: '090-7890-1234', email: 'k.watanabe@hospital.example.jp', address: '東京都豊島区南池袋7-7-7', position: '副部長' },
  { id: 'EMP-009', name: '小林大輔', nameKana: 'こばやし だいすけ', department: 'リハビリテーション科', jobType: '技師', employmentType: '常勤', joinDate: '2019/04/01', status: '出勤', birthDate: '1991/06/30', gender: '男性', phone: '090-9012-3456', email: 'd.kobayashi@hospital.example.jp', address: '東京都世田谷区三軒茶屋9-9-9', position: '一般' },
  { id: 'EMP-011', name: '吉田拓也', nameKana: 'よしだ たくや', department: '検査科', jobType: '技師', employmentType: '常勤', joinDate: '2020/08/01', status: '出勤', birthDate: '1993/10/22', gender: '男性', phone: '090-1111-2222', email: 't.yoshida@hospital.example.jp', address: '東京都文京区本郷11-11-11', position: '一般' },
  { id: 'EMP-012', name: '松本さくら', nameKana: 'まつもと さくら', department: '栄養科', jobType: 'その他', employmentType: 'パート', joinDate: '2023/01/10', status: '出勤', birthDate: '1998/04/01', gender: '女性', phone: '090-3333-4444', email: 's.matsumoto@hospital.example.jp', address: '東京都台東区上野12-12-12', position: '一般' },

  // Auto-generated staff to fill departments realistically (~100 total)
  ...generateExtraStaff(),
];

function generateExtraStaff(): Staff[] {
  const surnames = [
    { kanji: '佐々木', kana: 'ささき' }, { kanji: '松田', kana: 'まつだ' }, { kanji: '青木', kana: 'あおき' },
    { kanji: '藤田', kana: 'ふじた' }, { kanji: '金子', kana: 'かねこ' }, { kanji: '太田', kana: 'おおた' },
    { kanji: '石井', kana: 'いしい' }, { kanji: '小川', kana: 'おがわ' }, { kanji: '後藤', kana: 'ごとう' },
    { kanji: '堀', kana: 'ほり' }, { kanji: '菅原', kana: 'すがわら' }, { kanji: '竹内', kana: 'たけうち' },
    { kanji: '今井', kana: 'いまい' }, { kanji: '安藤', kana: 'あんどう' }, { kanji: '久保', kana: 'くぼ' },
    { kanji: '平野', kana: 'ひらの' }, { kanji: '川崎', kana: 'かわさき' }, { kanji: '工藤', kana: 'くどう' },
    { kanji: '北村', kana: 'きたむら' }, { kanji: '杉山', kana: 'すぎやま' }, { kanji: '白石', kana: 'しらいし' },
    { kanji: '中島', kana: 'なかじま' }, { kanji: '古川', kana: 'ふるかわ' }, { kanji: '高木', kana: 'たかぎ' },
    { kanji: '水野', kana: 'みずの' }, { kanji: '谷口', kana: 'たにぐち' }, { kanji: '新井', kana: 'あらい' },
    { kanji: '小野', kana: 'おの' }, { kanji: '馬場', kana: 'ばば' }, { kanji: '菊地', kana: 'きくち' },
    { kanji: '横山', kana: 'よこやま' }, { kanji: '上田', kana: 'うえだ' }, { kanji: '大西', kana: 'おおにし' },
    { kanji: '千葉', kana: 'ちば' }, { kanji: '片山', kana: 'かたやま' }, { kanji: '永井', kana: 'ながい' },
    { kanji: '岩崎', kana: 'いわさき' }, { kanji: '宮本', kana: 'みやもと' }, { kanji: '秋山', kana: 'あきやま' },
    { kanji: '関', kana: 'せき' }, { kanji: '大野', kana: 'おおの' }, { kanji: '丸山', kana: 'まるやま' },
    { kanji: '河野', kana: 'こうの' }, { kanji: '田村', kana: 'たむら' }, { kanji: '森', kana: 'もり' },
    { kanji: '武田', kana: 'たけだ' }, { kanji: '飯田', kana: 'いいだ' }, { kanji: '小島', kana: 'こじま' },
    { kanji: '星野', kana: 'ほしの' }, { kanji: '浜田', kana: 'はまだ' }, { kanji: '奥田', kana: 'おくだ' },
    { kanji: '土屋', kana: 'つちや' }, { kanji: '本田', kana: 'ほんだ' }, { kanji: '須藤', kana: 'すどう' },
    { kanji: '黒田', kana: 'くろだ' }, { kanji: '桜井', kana: 'さくらい' }, { kanji: '野村', kana: 'のむら' },
    { kanji: '松井', kana: 'まつい' }, { kanji: '吉川', kana: 'よしかわ' }, { kanji: '荒木', kana: 'あらき' },
    { kanji: '増田', kana: 'ますだ' }, { kanji: '富田', kana: 'とみた' }, { kanji: '内藤', kana: 'ないとう' },
    { kanji: '矢野', kana: 'やの' }, { kanji: '杉本', kana: 'すぎもと' }, { kanji: '山下', kana: 'やました' },
    { kanji: '浅野', kana: 'あさの' },
  ];
  const givenNamesM = [
    { kanji: '大輝', kana: 'だいき' }, { kanji: '悠人', kana: 'ゆうと' }, { kanji: '蓮', kana: 'れん' },
    { kanji: '陸', kana: 'りく' }, { kanji: '颯太', kana: 'そうた' }, { kanji: '樹', kana: 'いつき' },
    { kanji: '湊', kana: 'みなと' }, { kanji: '朝陽', kana: 'あさひ' }, { kanji: '奏', kana: 'かなで' },
    { kanji: '拓真', kana: 'たくま' }, { kanji: '和也', kana: 'かずや' }, { kanji: '直人', kana: 'なおと' },
    { kanji: '健太郎', kana: 'けんたろう' }, { kanji: '慎一', kana: 'しんいち' }, { kanji: '雅彦', kana: 'まさひこ' },
  ];
  const givenNamesF = [
    { kanji: '結衣', kana: 'ゆい' }, { kanji: '陽菜', kana: 'ひな' }, { kanji: '凛', kana: 'りん' },
    { kanji: '葵', kana: 'あおい' }, { kanji: '紬', kana: 'つむぎ' }, { kanji: '芽依', kana: 'めい' },
    { kanji: '莉子', kana: 'りこ' }, { kanji: '美月', kana: 'みづき' }, { kanji: '彩花', kana: 'あやか' },
    { kanji: '琴音', kana: 'ことね' }, { kanji: '千尋', kana: 'ちひろ' }, { kanji: '明日香', kana: 'あすか' },
    { kanji: '沙織', kana: 'さおり' }, { kanji: '恵美', kana: 'えみ' }, { kanji: '由紀子', kana: 'ゆきこ' },
  ];

  // Distribution: department -> { jobType, count }[]
  const deptConfig: { dept: string; roles: { job: string; count: number }[] }[] = [
    { dept: '内科病棟', roles: [{ job: '看護師', count: 5 }, { job: '医師', count: 2 }] },
    { dept: '外科病棟', roles: [{ job: '看護師', count: 5 }, { job: '医師', count: 1 }] },
    { dept: '救急科', roles: [{ job: '看護師', count: 4 }, { job: '医師', count: 2 }] },
    { dept: '小児科', roles: [{ job: '看護師', count: 3 }, { job: '医師', count: 1 }] },
    { dept: '産婦人科', roles: [{ job: '看護師', count: 3 }, { job: '医師', count: 1 }] },
    { dept: '放射線科', roles: [{ job: '技師', count: 3 }] },
    { dept: '事務部', roles: [{ job: '事務職', count: 5 }] },
    { dept: '薬剤部', roles: [{ job: '薬剤師', count: 4 }] },
    { dept: 'リハビリテーション科', roles: [{ job: '技師', count: 4 }] },
    { dept: '検査科', roles: [{ job: '技師', count: 3 }] },
    { dept: '栄養科', roles: [{ job: 'その他', count: 3 }] },
  ];

  const result: Staff[] = [];
  let idx = 35;
  let nameIdx = 0;
  const empTypes: ('常勤' | '非常勤' | 'パート')[] = ['常勤', '常勤', '常勤', '非常勤', 'パート'];
  const statuses: ('出勤' | '休暇')[] = ['出勤', '出勤', '出勤', '出勤', '休暇'];
  const positions = ['一般', '一般', '一般', '主任', '一般'];
  const areas = ['千代田区', '港区', '新宿区', '文京区', '台東区', '墨田区', '江東区', '品川区', '目黒区', '大田区', '世田谷区', '渋谷区', '中野区', '杉並区', '豊島区', '北区', '荒川区', '板橋区', '練馬区', '足立区', '葛飾区', '江戸川区'];

  for (const { dept, roles } of deptConfig) {
    for (const { job, count } of roles) {
      for (let i = 0; i < count; i++) {
        const isFemale = (nameIdx + i) % 2 === 0;
        const sn = surnames[nameIdx % surnames.length];
        const gn = isFemale
          ? givenNamesF[(nameIdx + i) % givenNamesF.length]
          : givenNamesM[(nameIdx + i) % givenNamesM.length];
        const id = `EMP-${String(idx).padStart(3, '0')}`;
        const birthYear = 1978 + (nameIdx % 22);
        const birthMonth = ((nameIdx * 3 + i * 7) % 12) + 1;
        const birthDay = ((nameIdx * 5 + i * 3) % 28) + 1;
        const joinYear = 2014 + (nameIdx % 12);
        const joinMonth = ((nameIdx + i) % 3 === 0) ? '04' : ((nameIdx + i) % 3 === 1 ? '10' : '01');

        result.push({
          id,
          name: `${sn.kanji}${gn.kanji}`,
          nameKana: `${sn.kana} ${gn.kana}`,
          department: dept,
          jobType: job,
          employmentType: empTypes[(nameIdx + i) % empTypes.length],
          joinDate: `${joinYear}/${joinMonth}/01`,
          status: statuses[(nameIdx + i) % statuses.length],
          birthDate: `${birthYear}/${String(birthMonth).padStart(2, '0')}/${String(birthDay).padStart(2, '0')}`,
          gender: isFemale ? '女性' : '男性',
          phone: `090-${String(1000 + idx).slice(-4)}-${String(2000 + idx).slice(-4)}`,
          email: `${sn.kana.charAt(0)}.${gn.kana}@hospital.example.jp`,
          address: `東京都${areas[nameIdx % areas.length]}${idx}-${idx}-${idx}`,
          position: positions[(nameIdx + i) % positions.length],
        });
        idx++;
        nameIdx++;
      }
    }
  }

  return result;
}

export const qualifications: Record<string, Qualification[]> = {
  'EMP-001': [
    { name: '医師免許', acquiredDate: '2006/04/01', expiryDate: null, status: '有効' },
    { name: '内科認定医', acquiredDate: '2012/04/01', expiryDate: '2026/03/31', status: '有効' },
    { name: 'BLS認定', acquiredDate: '2024/06/01', expiryDate: '2026/06/01', status: '更新予定' },
  ],
  'EMP-002': [
    { name: '看護師免許', acquiredDate: '2012/03/15', expiryDate: null, status: '有効' },
    { name: '救急看護認定', acquiredDate: '2020/04/01', expiryDate: '2025/03/31', status: '更新予定' },
  ],
  'EMP-003': [
    { name: '医師免許', acquiredDate: '2001/04/01', expiryDate: null, status: '有効' },
    { name: '救急科専門医', acquiredDate: '2008/04/01', expiryDate: '2028/03/31', status: '有効' },
  ],
};

export const departmentData: DepartmentData[] = [
  { name: '内科病棟', count: 42 },
  { name: '外科病棟', count: 38 },
  { name: '救急科', count: 28 },
  { name: '事務部', count: 25 },
  { name: '小児科', count: 22 },
  { name: '産婦人科', count: 18 },
  { name: '薬剤部', count: 16 },
  { name: 'リハビリテーション科', count: 15 },
  { name: '検査科', count: 14 },
  { name: '放射線科', count: 12 },
  { name: '栄養科', count: 10 },
  { name: 'その他', count: 8 },
];

export const jobTypeData: JobTypeData[] = [
  { name: '看護師', count: 98, color: '#0F6FDE' },
  { name: '医師', count: 45, color: '#10B981' },
  { name: '事務職', count: 35, color: '#EC4899' },
  { name: 'その他', count: 28, color: '#64748B' },
  { name: '技師', count: 26, color: '#8B5CF6' },
  { name: '薬剤師', count: 16, color: '#F59E0B' },
];

export const activities: Activity[] = [
  { time: '09:02', message: '鈴木美咲（看護師）が出勤打刻しました' },
  { time: '08:55', message: '山本健太（医師）が出勤打刻しました' },
  { time: '08:45', message: '佐藤花子（看護師）が3/15の休暇申請を提出しました' },
  { time: '08:30', message: '外科病棟の3月シフトが田中部長により承認されました' },
  { time: '昨日', message: '高橋誠（技師）の残業時間アラートが発生しました' },
  { time: '昨日', message: '新規職員 伊藤裕子（事務）の登録が完了しました' },
  { time: '2日前', message: '小児科の4月シフト作成が開始されました' },
  { time: '3日前', message: '看護師免許の更新対象者3名にリマインドを送信しました' },
];

export const shiftCoverageData: ShiftCoverage[] = [
  { department: '内科病棟', rate: 95 },
  { department: '外科病棟', rate: 88 },
  { department: '救急科', rate: 72 },
  { department: '小児科', rate: 100 },
  { department: '産婦人科', rate: 91 },
];

export const notifications: Notification[] = [
  { id: 1, message: '佐藤花子さんが休暇申請を提出しました', time: '10分前' },
  { id: 2, message: '3月のシフトが未確定です（外科病棟）', time: '1時間前' },
  { id: 3, message: '田中一郎さんの資格（看護師免許）が来月更新期限です', time: '3時間前' },
  { id: 4, message: '先週の残業時間が基準を超過している職員が4名います', time: '昨日' },
  { id: 5, message: '新しい職員（鈴木美咲）の登録が完了しました', time: '2日前' },
];

export const attendanceRecords: AttendanceRecord[] = [
  { staffId: 'EMP-001', name: '山田太郎', department: '内科病棟', clockIn: '08:30', clockOut: '17:45', workHours: '9時間15分', overtime: '0時間45分', status: '退勤済' },
  { staffId: 'EMP-002', name: '佐藤花子', department: '外科病棟', clockIn: '08:45', clockOut: '18:30', workHours: '9時間45分', overtime: '1時間15分', status: '退勤済' },
  { staffId: 'EMP-003', name: '田中一郎', department: '救急科', clockIn: '08:25', clockOut: null, workHours: null, overtime: null, status: '出勤中' },
  { staffId: 'EMP-004', name: '鈴木美咲', department: '内科病棟', clockIn: '09:02', clockOut: null, workHours: null, overtime: null, status: '出勤中' },
  { staffId: 'EMP-005', name: '高橋誠', department: '放射線科', clockIn: '08:50', clockOut: null, workHours: null, overtime: null, status: '出勤中' },
  { staffId: 'EMP-006', name: '伊藤裕子', department: '事務部', clockIn: '08:55', clockOut: null, workHours: null, overtime: null, status: '出勤中' },
  { staffId: 'EMP-007', name: '渡辺健一', department: '薬剤部', clockIn: null, clockOut: null, workHours: null, overtime: null, status: '未打刻' },
  { staffId: 'EMP-008', name: '中村あかり', department: '小児科', clockIn: '08:40', clockOut: null, workHours: null, overtime: null, status: '出勤中' },
  { staffId: 'EMP-009', name: '小林大輔', department: 'リハビリテーション科', clockIn: '08:35', clockOut: '17:30', workHours: '8時間55分', overtime: null, status: '退勤済' },
  { staffId: 'EMP-010', name: '加藤真由美', department: '産婦人科', clockIn: '09:05', clockOut: null, workHours: null, overtime: null, status: '遅刻' },
  { staffId: 'EMP-011', name: '吉田拓也', department: '検査科', clockIn: '08:58', clockOut: null, workHours: null, overtime: null, status: '出勤中' },
  { staffId: 'EMP-012', name: '松本さくら', department: '栄養科', clockIn: '09:10', clockOut: null, workHours: null, overtime: null, status: '遅刻' },
  { staffId: 'EMP-013', name: '井上隆', department: '外科病棟', clockIn: null, clockOut: null, workHours: null, overtime: null, status: '未打刻' },
  { staffId: 'EMP-014', name: '木村美穂', department: '内科病棟', clockIn: '08:48', clockOut: null, workHours: null, overtime: null, status: '出勤中' },
  { staffId: 'EMP-015', name: '斎藤翔太', department: '救急科', clockIn: '09:15', clockOut: null, workHours: null, overtime: null, status: '遅刻' },
];

export const monthlyAttendance: MonthlyAttendance[] = [
  { staffId: 'EMP-001', name: '山田太郎', workDays: 20, absent: 0, late: 0, earlyLeave: 0, overtime: 15.5, paidLeave: 1 },
  { staffId: 'EMP-002', name: '佐藤花子', workDays: 18, absent: 1, late: 2, earlyLeave: 0, overtime: 8.0, paidLeave: 2 },
  { staffId: 'EMP-003', name: '田中一郎', workDays: 21, absent: 0, late: 0, earlyLeave: 0, overtime: 42.0, paidLeave: 0 },
  { staffId: 'EMP-004', name: '鈴木美咲', workDays: 19, absent: 0, late: 1, earlyLeave: 0, overtime: 5.5, paidLeave: 2 },
  { staffId: 'EMP-005', name: '高橋誠', workDays: 20, absent: 0, late: 0, earlyLeave: 1, overtime: 45.0, paidLeave: 1 },
  { staffId: 'EMP-006', name: '伊藤裕子', workDays: 20, absent: 0, late: 0, earlyLeave: 0, overtime: 3.0, paidLeave: 1 },
  { staffId: 'EMP-007', name: '渡辺健一', workDays: 17, absent: 2, late: 0, earlyLeave: 0, overtime: 0, paidLeave: 3 },
  { staffId: 'EMP-008', name: '中村あかり', workDays: 15, absent: 0, late: 0, earlyLeave: 0, overtime: 2.0, paidLeave: 0 },
  { staffId: 'EMP-009', name: '小林大輔', workDays: 20, absent: 0, late: 0, earlyLeave: 0, overtime: 10.5, paidLeave: 1 },
  { staffId: 'EMP-010', name: '加藤真由美', workDays: 19, absent: 0, late: 1, earlyLeave: 0, overtime: 12.0, paidLeave: 2 },
  { staffId: 'EMP-011', name: '吉田拓也', workDays: 20, absent: 0, late: 0, earlyLeave: 0, overtime: 8.5, paidLeave: 1 },
  { staffId: 'EMP-012', name: '松本さくら', workDays: 14, absent: 0, late: 2, earlyLeave: 1, overtime: 0, paidLeave: 0 },
  { staffId: 'EMP-013', name: '井上隆', workDays: 18, absent: 1, late: 0, earlyLeave: 0, overtime: 22.0, paidLeave: 2 },
  { staffId: 'EMP-014', name: '木村美穂', workDays: 16, absent: 0, late: 0, earlyLeave: 0, overtime: 1.0, paidLeave: 0 },
  { staffId: 'EMP-015', name: '斎藤翔太', workDays: 20, absent: 0, late: 1, earlyLeave: 0, overtime: 18.5, paidLeave: 1 },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'LV-2026-001', staffName: '佐藤花子', department: '外科病棟', leaveType: '有給休暇', startDate: '03/15', endDate: '03/15', days: 1, applicationDate: '03/05', status: '承認待ち' },
  { id: 'LV-2026-002', staffName: '渡辺健一', department: '薬剤部', leaveType: '病気休暇', startDate: '03/03', endDate: '03/05', days: 3, applicationDate: '03/03', status: '承認済' },
  { id: 'LV-2026-003', staffName: '中村あかり', department: '小児科', leaveType: '有給休暇', startDate: '03/20', endDate: '03/21', days: 2, applicationDate: '03/04', status: '承認待ち' },
  { id: 'LV-2026-004', staffName: '高橋誠', department: '放射線科', leaveType: '特別休暇', startDate: '03/10', endDate: '03/12', days: 3, applicationDate: '03/01', status: '承認済' },
  { id: 'LV-2026-005', staffName: '井上隆', department: '外科病棟', leaveType: '慶弔休暇', startDate: '03/06', endDate: '03/08', days: 3, applicationDate: '03/04', status: '承認済' },
  { id: 'LV-2026-006', staffName: '松本さくら', department: '栄養科', leaveType: '有給休暇', startDate: '03/25', endDate: '03/26', days: 2, applicationDate: '03/05', status: '承認待ち' },
  { id: 'LV-2026-007', staffName: '木村美穂', department: '内科病棟', leaveType: '有給休暇', startDate: '03/18', endDate: '03/18', days: 1, applicationDate: '03/04', status: '却下' },
  { id: 'LV-2026-008', staffName: '加藤真由美', department: '産婦人科', leaveType: '病気休暇', startDate: '02/28', endDate: '03/01', days: 2, applicationDate: '02/28', status: '承認済' },
];

// Generate shift data for all staff × variable days
export function generateShiftData(year: number = 2026, month: number = 2): Record<string, ShiftType[]> {
  const shifts: Record<string, ShiftType[]> = {};
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Seed-based pseudo-random for consistent data
  const seed = (id: string) => {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = ((h << 5) - h + id.charCodeAt(i)) | 0;
    return Math.abs(h);
  };

  staffList.forEach((staff) => {
    const days: ShiftType[] = [];
    const s = seed(staff.id);

    for (let d = 1; d <= daysInMonth; d++) {
      const dayOfWeek = new Date(year, month, d).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      if (staff.jobType === '医師') {
        // Doctors: weekdays day shift, occasional on-call, weekends mostly off
        if (isWeekend) {
          // 1 in 4 weekends on-call
          days.push((d + s) % 4 === 0 ? '当' : '休');
        } else {
          // Occasional on-call during weekdays
          days.push((d + s) % 10 === 0 ? '当' : '日');
        }
      } else if (staff.jobType === '看護師') {
        // Nurses: realistic 3-shift rotation (日日夜夜準休休 pattern with variation)
        const cycle = (d + s) % 7;
        if (cycle <= 1) days.push('日');
        else if (cycle <= 2) days.push('夜');
        else if (cycle === 3) days.push('準');
        else if (cycle <= 5) days.push('休');
        else {
          // Occasionally paid leave
          days.push((d + s) % 15 === 0 ? '有' : '日');
        }
      } else if (staff.jobType === '事務職') {
        if (isWeekend) {
          days.push('休');
        } else {
          days.push((d + s) % 20 === 0 ? '有' : '日');
        }
      } else {
        // Technicians, pharmacists, etc.
        if (isWeekend) {
          days.push((d + s) % 3 === 0 ? '日' : '休');
        } else {
          days.push((d + s) % 18 === 0 ? '有' : '日');
        }
      }
    }
    shifts[staff.id] = days;
  });

  return shifts;
}

export const departments = [
  '内科病棟', '外科病棟', '救急科', '小児科', '産婦人科',
  'リハビリテーション科', '放射線科', '検査科', '薬剤部', '事務部', '栄養科', 'その他'
];

export const jobTypes = ['医師', '看護師', '薬剤師', '技師', '事務職', 'その他'];
export const employmentTypes = ['常勤', '非常勤', 'パート'];
