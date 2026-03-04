export interface JobPost {
  id: string;
  title: string;
  company: string;
  field: 'Công nghệ thông tin' | 'Dữ liệu' | 'Kiểm thử phần mềm' | 'Sản phẩm';
  position: 'Intern' | 'Fresher' | 'Junior';
  salaryMin: number;
  salaryMax: number;
  location: string;
  matchScore: number;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export const mockJobs: JobPost[] = [
  {
    id: 'backend-java-intern-techify',
    title: 'Backend Java Intern',
    company: 'Techify Vietnam',
    field: 'Công nghệ thông tin',
    position: 'Intern',
    salaryMin: 5000000,
    salaryMax: 8000000,
    location: 'TP. Hồ Chí Minh',
    matchScore: 89,
    summary:
      'Tham gia xây dựng API cho hệ thống tuyển dụng, làm việc với Spring Boot, MySQL và Docker.',
    responsibilities: [
      'Phát triển và tối ưu RESTful API bằng Java Spring Boot.',
      'Phối hợp với Frontend để thống nhất contract API và xử lý lỗi.',
      'Viết unit test cho các module nghiệp vụ quan trọng.',
      'Tham gia code review và sprint planning cùng team.',
    ],
    requirements: [
      'Nắm chắc Java core, OOP, SQL cơ bản.',
      'Đã học hoặc đã làm project với Spring Boot.',
      'Có kiến thức về Git, Postman, Docker là lợi thế.',
      'Kỹ năng giao tiếp và chủ động học hỏi tốt.',
    ],
    benefits: [
      'Mentor 1-1 với Senior Engineer.',
      'Trợ cấp 5-8 triệu/tháng theo năng lực.',
      'Có cơ hội lên Fresher chính thức sau kỳ thực tập.',
    ],
  },
  {
    id: 'frontend-react-fresher-nextgen',
    title: 'Frontend React Fresher',
    company: 'NextGen Solutions',
    field: 'Công nghệ thông tin',
    position: 'Fresher',
    salaryMin: 8000000,
    salaryMax: 12000000,
    location: 'Hà Nội',
    matchScore: 84,
    summary: 'Xây dựng giao diện web với React + TypeScript, tối ưu UX cho nền tảng SaaS.',
    responsibilities: [
      'Phát triển UI theo design system và tài liệu Figma.',
      'Tối ưu hiệu năng rendering và trải nghiệm trên mobile.',
      'Kết nối API và xử lý state bằng React Query.',
      'Phối hợp với QA để đảm bảo chất lượng release.',
    ],
    requirements: [
      'Thành thạo HTML, CSS, JavaScript/TypeScript.',
      'Đã làm project với React hoặc Vite.',
      'Biết cách đọc và chia nhỏ component.',
      'Có mindset UX và khả năng làm việc nhóm.',
    ],
    benefits: [
      'Mức lương 8-12 triệu/tháng.',
      'Hybrid 2 ngày/tuần, linh hoạt giờ giấc.',
      'Hỗ trợ học cert frontend chính hãng.',
    ],
  },
  {
    id: 'qa-automation-junior-finstack',
    title: 'QA Automation Junior',
    company: 'FinStack',
    field: 'Kiểm thử phần mềm',
    position: 'Junior',
    salaryMin: 12000000,
    salaryMax: 17000000,
    location: 'Đà Nẵng',
    matchScore: 79,
    summary: 'Xây dựng bộ test tự động cho sản phẩm fintech và phân tích lỗi release.',
    responsibilities: [
      'Viết test case và test script cho API và web.',
      'Tích hợp test automation vào CI/CD pipeline.',
      'Làm việc với dev để tái hiện bug và đề xuất cách phòng tránh.',
      'Theo dõi báo cáo quality metric theo sprint.',
    ],
    requirements: [
      'Kiến thức cơ bản về QA process và SDLC.',
      'Có kinh nghiệm với Playwright/Cypress là điểm cộng.',
      'Tư duy phân tích lỗi tốt, cẩn thận với chi tiết.',
      'Biết SQL và API testing với Postman.',
    ],
    benefits: [
      'Lương 12-17 triệu + thưởng quý.',
      'Bảo hiểm đầy đủ, khám sức khỏe định kỳ.',
      'Lộ trình phát triển lên QA Lead rõ ràng.',
    ],
  },
  {
    id: 'product-analyst-intern-growthlab',
    title: 'Product Analyst Intern',
    company: 'GrowthLab',
    field: 'Sản phẩm',
    position: 'Intern',
    salaryMin: 6000000,
    salaryMax: 9000000,
    location: 'TP. Hồ Chí Minh',
    matchScore: 76,
    summary:
      'Phân tích hành vi người dùng, đề xuất cải tiến tính năng cho ứng dụng học tập trực tuyến.',
    responsibilities: [
      'Tổng hợp dữ liệu từ dashboard và cohort report.',
      'Hỗ trợ Product Manager xây dựng PRD và user story.',
      'Đánh giá kết quả A/B testing theo metric.',
      'Trình bày insight cho team Product và Marketing.',
    ],
    requirements: [
      'Kiến thức cơ bản về product metrics (DAU, retention).',
      'Sử dụng tốt Google Sheets/Excel.',
      'Có tư duy logic và đặt câu hỏi nghiệp vụ tốt.',
      'Biết SQL hoặc BI tools là lợi thế.',
    ],
    benefits: [
      'Được training trực tiếp bởi Product Lead.',
      'Trợ cấp 6-9 triệu/tháng.',
      'Môi trường năng động, đề xuất ý tưởng nhanh.',
    ],
  },
];

export function getJobById(jobId: string): JobPost | undefined {
  return mockJobs.find(job => job.id === jobId);
}

export function formatSalaryVnd(min: number, max: number): string {
  return `${Math.round(min / 1000000)} - ${Math.round(max / 1000000)} triệu VND`;
}
