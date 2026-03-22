export type Template = 'ats' | 'creative' | 'business';
export type Step = 0 | 1 | 2 | 3;

export interface ContactInfo {
    fullName: string; email: string; phone: string;
    linkedin: string; github: string; portfolio: string;
}
export interface Education { school: string; degree: string; year: string; gpa: string; }
export interface ExperienceEntry {
    id: string; company: string; role: string; period: string;
    description: string; optimizing: boolean;
}
export interface SkillEntry { id: string; name: string; }
export interface LanguageEntry { id: string; name: string; level: 'Beginner' | 'Fluent' | 'Native'; }
export interface AchievementEntry { id: string; text: string; highlight: boolean; }

export interface CvDraft {
    template: Template;
    targetRole: string;
    contact: ContactInfo;
    education: Education;
    experiences: ExperienceEntry[];
    hardSkills: SkillEntry[];
    softSkills: SkillEntry[];
    languages: LanguageEntry[];
    achievements: AchievementEntry[];
}

export interface CategoryScore {
    label: string; icon: string; score: number; color: string; tips: string[];
}

export function uid() { return Math.random().toString(36).slice(2, 9); }

const KW: Record<string, string[]> = {
    java: ['Spring Boot', 'Hibernate', 'Maven', 'JUnit', 'Docker', 'REST API'],
    backend: ['Node.js', 'PostgreSQL', 'Redis', 'Microservices', 'CI/CD', 'Docker'],
    frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vite', 'GraphQL'],
    mobile: ['React Native', 'Flutter', 'Firebase', 'Dart', 'Swift', 'Kotlin'],
    data: ['Python', 'Pandas', 'SQL', 'Power BI', 'Machine Learning', 'Tableau'],
};
export function getKeywords(role: string): string[] {
    const l = role.toLowerCase();
    for (const [k, v] of Object.entries(KW)) if (l.includes(k)) return v;
    if (l) return ['Git', 'Agile', 'Scrum', 'Teamwork', 'Problem Solving', 'Communication'];
    return [];
}

export function computeCategories(d: CvDraft): CategoryScore[] {
    let con = 0; const conT: string[] = [];
    if (d.contact.fullName.trim()) con += 20; else conT.push('Thêm họ và tên.');
    if (d.contact.email.trim()) con += 15; else conT.push('Thêm email liên lạc.');
    if (d.contact.phone.trim()) con += 10; else conT.push('Thêm số điện thoại.');
    if (d.education.school.trim()) con += 25; else conT.push('Bổ sung thông tin học vấn.');
    if (d.education.degree.trim()) con += 15;
    if (d.targetRole.trim()) con += 15; else conT.push('Nhập vị trí mục tiêu.');

    const allS = [...d.hardSkills, ...d.softSkills].map(s => s.name.toLowerCase());
    const rk = getKeywords(d.targetRole);
    const matched = rk.filter(kw => allS.some(s => s.includes(kw.toLowerCase())));
    let kw = Math.round((matched.length / Math.max(rk.length, 1)) * 70);
    const kwT: string[] = [];
    if (d.hardSkills.length >= 5) kw = Math.min(kw + 20, 100); else kwT.push('Thêm ít nhất 5 Hard Skills.');
    if (!d.targetRole.trim()) kwT.push('Nhập vị trí mục tiêu để nhận gợi ý từ khóa.');
    if (matched.length === 0 && rk.length > 0) kwT.push(`Thêm: ${rk.slice(0, 3).join(', ')}...`);

    let fmt = 0; const fmtT: string[] = [];
    if (d.experiences.length > 0) fmt += 35; else fmtT.push('Thêm ít nhất 1 mục Kinh nghiệm.');
    if (d.hardSkills.length > 0) fmt += 25; else fmtT.push('Bổ sung phần Kỹ năng.');
    if (d.languages.length > 0) fmt += 20; else fmtT.push('Thêm ít nhất 1 Ngoại ngữ.');
    if (d.contact.linkedin.trim() || d.contact.github.trim()) fmt += 20;
    else fmtT.push('Thêm LinkedIn hoặc GitHub.');

    const totalDesc = d.experiences.reduce((a, e) => a + e.description.trim().length, 0);
    let wrt = 0; const wrtT: string[] = [];
    if (totalDesc > 200) wrt += 50;
    else if (totalDesc > 80) { wrt += 30; wrtT.push('Viết mô tả chi tiết hơn.'); }
    else wrtT.push('Mô tả còn quá ngắn, hãy dùng ✨ AI Optimize.');
    const hasVerbs = d.experiences.some(e => /(phát triển|xây dựng|tối ưu|tăng|giảm|quản lý|triển khai)/i.test(e.description));
    if (hasVerbs) wrt += 30; else wrtT.push('Dùng động từ hành động (phát triển, xây dựng, tối ưu...).');
    if (d.achievements.length > 0) wrt += 20; else wrtT.push('Thêm Thành tựu.');

    let met = 0; const metT: string[] = [];
    const hasNums = d.experiences.some(e => /\d+%|\d+x|giảm|tăng|\d+ (người|user|project)/i.test(e.description));
    if (hasNums) met += 60; else metT.push('Thêm con số cụ thể: %, số người dùng...');
    const hAch = d.achievements.filter(a => a.highlight);
    if (hAch.length > 0) met += 40;
    else if (d.achievements.length > 0) { met += 20; metT.push('Đánh dấu ⭐ thành tựu nổi bật.'); }
    else metT.push('Thêm Thành tựu có số liệu định lượng.');

    return [
        { label: 'Nội dung', icon: '📝', score: Math.min(con, 100), color: 'indigo', tips: conT },
        { label: 'Từ khóa', icon: '🔑', score: Math.min(kw, 100), color: 'violet', tips: kwT },
        { label: 'Định dạng', icon: '📐', score: Math.min(fmt, 100), color: 'blue', tips: fmtT },
        { label: 'Diễn đạt', icon: '✍️', score: Math.min(wrt, 100), color: 'emerald', tips: wrtT },
        { label: 'Số liệu', icon: '📊', score: Math.min(met, 100), color: 'amber', tips: metT },
    ];
}

export function healthScore(d: CvDraft) {
    const cats = computeCategories(d);
    return Math.round(cats.reduce((a, c) => a + c.score, 0) / cats.length);
}

export function letterGrade(s: number) {
    if (s >= 85) return { grade: 'A', label: 'Xuất sắc', bg: 'from-emerald-400 to-green-500' };
    if (s >= 70) return { grade: 'B', label: 'Tốt', bg: 'from-blue-400 to-indigo-500' };
    if (s >= 50) return { grade: 'C', label: 'Trung bình', bg: 'from-amber-400 to-orange-500' };
    return { grade: 'D', label: 'Cần cải thiện', bg: 'from-red-400 to-rose-500' };
}

export const C_BAR: Record<string, string> = { indigo: 'bg-indigo-500', violet: 'bg-violet-500', blue: 'bg-blue-500', emerald: 'bg-emerald-500', amber: 'bg-amber-500' };
export const C_BG: Record<string, string> = { indigo: 'bg-indigo-50 border-indigo-100', violet: 'bg-violet-50 border-violet-100', blue: 'bg-blue-50 border-blue-100', emerald: 'bg-emerald-50 border-emerald-100', amber: 'bg-amber-50 border-amber-100' };
export const C_TXT: Record<string, string> = { indigo: 'text-indigo-700', violet: 'text-violet-700', blue: 'text-blue-700', emerald: 'text-emerald-700', amber: 'text-amber-700' };

export const initialDraft: CvDraft = {
    template: 'ats', targetRole: '',
    contact: { fullName: '', email: '', phone: '', linkedin: '', github: '', portfolio: '' },
    education: { school: '', degree: '', year: '', gpa: '' },
    experiences: [{ id: uid(), company: '', role: '', period: '', description: '', optimizing: false }],
    hardSkills: [], softSkills: [], languages: [], achievements: [],
};
