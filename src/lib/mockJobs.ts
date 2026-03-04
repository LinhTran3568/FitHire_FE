export interface JobPost {
  id: string;
  title: string;
  company: string;
  field: 'Công nghệ thông tin' | 'Dữ liệu' | 'Kiểm thử phần mềm' | 'Sản phẩm';
  position: 'Intern' | 'Fresher' | 'Junior';
  salaryMin: number;
  salaryMax: number;
  location: string;
  workMode: 'Onsite' | 'Hybrid' | 'Remote';
  postedAt: string;
  matchScore: number;
  skills: string[];
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
    workMode: 'Onsite',
    postedAt: '2026-03-03',
    matchScore: 89,
    skills: ['Java', 'Spring Boot', 'SQL', 'Docker'],
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
    workMode: 'Hybrid',
    postedAt: '2026-03-02',
    matchScore: 84,
    skills: ['React', 'TypeScript', 'Tailwind', 'React Query'],
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
    workMode: 'Remote',
    postedAt: '2026-03-01',
    matchScore: 79,
    skills: ['Playwright', 'API Testing', 'SQL', 'CI/CD'],
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
    workMode: 'Hybrid',
    postedAt: '2026-02-28',
    matchScore: 76,
    skills: ['Product Metrics', 'A/B Testing', 'Excel', 'SQL'],
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
  {
    id: 'data-analyst-fresher-insightx',
    title: 'Data Analyst Fresher',
    company: 'InsightX',
    field: 'Dữ liệu',
    position: 'Fresher',
    salaryMin: 9000000,
    salaryMax: 13000000,
    location: 'Hà Nội',
    workMode: 'Hybrid',
    postedAt: '2026-02-27',
    matchScore: 82,
    skills: ['SQL', 'Power BI', 'Python', 'Statistics'],
    summary: 'Phân tích dữ liệu sản phẩm, trực quan hóa dashboard và đề xuất insight tăng trưởng.',
    responsibilities: [
      'Xây dựng dashboard theo yêu cầu nghiệp vụ.',
      'Phân tích cohort, retention và conversion funnel.',
      'Làm việc cùng Product để theo dõi các chỉ số chính.',
      'Đề xuất thử nghiệm dựa trên dữ liệu thực tế.',
    ],
    requirements: [
      'Nắm cơ bản SQL và tư duy phân tích dữ liệu.',
      'Biết dùng Power BI/Tableau là điểm cộng.',
      'Có khả năng kể chuyện bằng dữ liệu.',
      'Chủ động và giao tiếp tốt với team đa chức năng.',
    ],
    benefits: [
      'Lộ trình growth rõ ràng cho Fresher Data.',
      'Mentor 1-1 với Senior Data Analyst.',
      'Hybrid linh hoạt, môi trường học nhanh.',
    ],
  },
  {
    id: 'ui-ux-design-intern-visionx',
    title: 'UI/UX Design Intern',
    company: 'VisionX Studio',
    field: 'Sản phẩm',
    position: 'Intern',
    salaryMin: 4000000,
    salaryMax: 7000000,
    location: 'TP. Hồ Chí Minh',
    workMode: 'Hybrid',
    postedAt: '2026-02-26',
    matchScore: 62,
    skills: ['Figma', 'UI Design', 'Design System', 'User Research'],
    summary:
      'Thiết kế giao diện cho sản phẩm mobile/web, phối hợp chặt với team Product và Frontend.',
    responsibilities: [
      'Thiết kế wireframe và prototype theo user flow.',
      'Chuẩn hóa component trong design system.',
      'Phối hợp với dev để nghiệm thu UI trước khi release.',
      'Tham gia user testing và tổng hợp insight.',
    ],
    requirements: [
      'Biết dùng Figma cơ bản và tư duy thẩm mỹ tốt.',
      'Có portfolio hoặc đồ án về UI/UX là lợi thế.',
      'Giao tiếp tốt khi làm việc đa phòng ban.',
      'Chủ động tiếp nhận feedback để cải thiện thiết kế.',
    ],
    benefits: [
      'Trợ cấp 4-7 triệu/tháng.',
      'Mentor trực tiếp từ Product Designer.',
      'Làm việc hybrid linh hoạt theo lịch học.',
    ],
  },
  {
    id: 'manual-qa-intern-retailpro',
    title: 'Manual QA Intern',
    company: 'RetailPro',
    field: 'Kiểm thử phần mềm',
    position: 'Intern',
    salaryMin: 4500000,
    salaryMax: 6500000,
    location: 'Cần Thơ',
    workMode: 'Onsite',
    postedAt: '2026-02-25',
    matchScore: 58,
    skills: ['Manual Testing', 'Test Case', 'Jira', 'Regression'],
    summary: 'Thực hiện kiểm thử thủ công cho hệ thống thương mại điện tử trước mỗi đợt phát hành.',
    responsibilities: [
      'Viết và thực thi test case cho luồng nghiệp vụ chính.',
      'Báo bug trên Jira và phối hợp với dev để tái hiện lỗi.',
      'Kiểm tra regression sau khi fix bug.',
      'Tổng hợp báo cáo chất lượng theo sprint.',
    ],
    requirements: [
      'Hiểu cơ bản quy trình kiểm thử phần mềm.',
      'Cẩn thận và có tư duy phân tích lỗi.',
      'Biết sử dụng Jira hoặc công cụ tương đương.',
      'Khả năng viết tài liệu test rõ ràng.',
    ],
    benefits: [
      'Trợ cấp 4.5-6.5 triệu/tháng.',
      'Được đào tạo quy trình QA chuẩn doanh nghiệp.',
      'Cơ hội lên QA Fresher sau kỳ thực tập.',
    ],
  },
  {
    id: 'data-engineer-junior-quantflow',
    title: 'Data Engineer Junior',
    company: 'QuantFlow',
    field: 'Dữ liệu',
    position: 'Junior',
    salaryMin: 14000000,
    salaryMax: 20000000,
    location: 'Hà Nội',
    workMode: 'Onsite',
    postedAt: '2026-02-24',
    matchScore: 64,
    skills: ['Spark', 'Airflow', 'Kafka', 'ETL'],
    summary:
      'Xây dựng pipeline dữ liệu thời gian thực phục vụ báo cáo vận hành và machine learning.',
    responsibilities: [
      'Phát triển và tối ưu data pipeline ETL/ELT.',
      'Giám sát chất lượng dữ liệu và xử lý dữ liệu lỗi.',
      'Phối hợp Data Analyst để cung cấp dataset chuẩn.',
      'Tối ưu chi phí xử lý dữ liệu trên hạ tầng cloud.',
    ],
    requirements: [
      'Kinh nghiệm cơ bản với SQL và xử lý dữ liệu lớn.',
      'Biết một trong các công cụ: Spark, Airflow, Kafka.',
      'Tư duy hệ thống và khả năng debug pipeline.',
      'Sẵn sàng làm việc onsite theo dự án.',
    ],
    benefits: [
      'Lương 14-20 triệu theo năng lực.',
      'Tham gia hệ thống dữ liệu quy mô lớn.',
      'Lộ trình phát triển lên Middle Data Engineer.',
    ],
  },
  {
    id: 'content-product-fresher-eduplus',
    title: 'Content Product Fresher',
    company: 'EduPlus',
    field: 'Sản phẩm',
    position: 'Fresher',
    salaryMin: 7000000,
    salaryMax: 10000000,
    location: 'Đà Nẵng',
    workMode: 'Remote',
    postedAt: '2026-02-23',
    matchScore: 49,
    skills: ['Content Strategy', 'SEO', 'Copywriting', 'User Journey'],
    summary:
      'Xây dựng nội dung cho sản phẩm EdTech, tối ưu trải nghiệm onboarding và giữ chân người dùng.',
    responsibilities: [
      'Viết nội dung in-app và email lifecycle.',
      'Phân tích user journey để tối ưu nội dung theo từng nhóm.',
      'Phối hợp Product để triển khai A/B test nội dung.',
      'Đo lường hiệu quả theo chỉ số activation và retention.',
    ],
    requirements: [
      'Khả năng viết nội dung mạch lạc, đúng insight người dùng.',
      'Biết cơ bản về SEO và hành vi người dùng số.',
      'Tư duy thử nghiệm và cải tiến liên tục.',
      'Ưu tiên ứng viên có kinh nghiệm dự án content/product.',
    ],
    benefits: [
      'Lương 7-10 triệu, làm việc remote linh hoạt.',
      'Được training về growth và product writing.',
      'Môi trường startup giáo dục năng động.',
    ],
  },
];

export interface CompanyInfo {
  name: string;
  industry: string;
  size: string;
  location: string;
  founded: string;
  website: string;
  description: string;
  perks: string[];
}

export const companyDirectory: Record<string, CompanyInfo> = {
  'Techify Vietnam': {
    name: 'Techify Vietnam',
    industry: 'Công nghệ thông tin',
    size: '200 - 500 nhân viên',
    location: 'TP. Hồ Chí Minh',
    founded: '2018',
    website: 'techify.vn',
    description:
      'Techify Vietnam là công ty phần mềm chuyên xây dựng nền tảng tuyển dụng và HR-tech cho doanh nghiệp vừa và nhỏ tại Việt Nam. Sản phẩm chủ lực là hệ thống ATS và bộ công cụ onboarding tích hợp AI.',
    perks: [
      'Mentor 1-1 với Senior Engineer',
      'Lộ trình rõ ràng lên Fresher',
      'Team Agile hiện đại',
    ],
  },
  'NextGen Solutions': {
    name: 'NextGen Solutions',
    industry: 'SaaS / Phần mềm',
    size: '100 - 300 nhân viên',
    location: 'Hà Nội',
    founded: '2020',
    website: 'nextgen.com.vn',
    description:
      'NextGen Solutions phát triển bộ sản phẩm SaaS cho quản lý vận hành doanh nghiệp, đặc biệt trong lĩnh vực logistics và bán lẻ. Công ty tập trung mạnh vào trải nghiệm người dùng và hiệu năng sản phẩm.',
    perks: ['Hybrid 2 ngày/tuần', 'Hỗ trợ học cert frontend', 'Môi trường sáng tạo'],
  },
  FinStack: {
    name: 'FinStack',
    industry: 'Fintech',
    size: '50 - 150 nhân viên',
    location: 'Đà Nẵng',
    founded: '2021',
    website: 'finstack.io',
    description:
      'FinStack là startup fintech tập trung vào giải pháp thanh toán và quản lý tài chính cá nhân. Sản phẩm đang phục vụ hơn 300.000 người dùng trên toàn quốc với tốc độ tăng trưởng 40%/năm.',
    perks: ['Remote 100%', 'Thưởng quý theo hiệu suất', 'Bảo hiểm toàn diện'],
  },
  GrowthLab: {
    name: 'GrowthLab',
    industry: 'EdTech / Product',
    size: '30 - 80 nhân viên',
    location: 'TP. Hồ Chí Minh',
    founded: '2022',
    website: 'growthlab.vn',
    description:
      'GrowthLab xây dựng nền tảng học tập trực tuyến kết hợp dữ liệu hành vi người dùng để cá nhân hóa lộ trình học. Đội ngũ product nhỏ nhưng di chuyển nhanh, đề cao metric-driven và A/B testing.',
    perks: ['Training bởi Product Lead', 'Môi trường startup năng động', 'Hybrid linh hoạt'],
  },
  InsightX: {
    name: 'InsightX',
    industry: 'Data Analytics',
    size: '80 - 200 nhân viên',
    location: 'Hà Nội',
    founded: '2019',
    website: 'insightx.com.vn',
    description:
      'InsightX cung cấp giải pháp phân tích dữ liệu và BI cho doanh nghiệp lớn tại Đông Nam Á. Công ty có đội ngũ Data Engineer và Analyst hơn 100 người, chuyên sâu về real-time analytics và data visualization.',
    perks: ['Mentor 1-1 với Senior Data Analyst', 'Hybrid linh hoạt', 'Lộ trình growth rõ ràng'],
  },
  'VisionX Studio': {
    name: 'VisionX Studio',
    industry: 'Design / Product',
    size: '20 - 60 nhân viên',
    location: 'TP. Hồ Chí Minh',
    founded: '2021',
    website: 'visionx.studio',
    description:
      'VisionX Studio là design agency chuyên xây dựng sản phẩm digital và design system cho các startup công nghệ. Đội ngũ trẻ, đam mê thiết kế tập trung vào UI/UX chất lượng cao và trải nghiệm người dùng.',
    perks: ['Mentor từ Product Designer', 'Portfolio thực tế', 'Làm việc hybrid linh hoạt'],
  },
  RetailPro: {
    name: 'RetailPro',
    industry: 'Thương mại điện tử',
    size: '300 - 700 nhân viên',
    location: 'Cần Thơ',
    founded: '2016',
    website: 'retailpro.vn',
    description:
      'RetailPro phát triển nền tảng thương mại điện tử và phần mềm quản lý bán lẻ cho chuỗi cửa hàng trên toàn quốc. Đây là một trong những công ty công nghệ bán lẻ lớn nhất tại khu vực Đồng bằng sông Cửu Long.',
    perks: ['Được đào tạo quy trình QA chuẩn', 'Lộ trình lên QA Fresher', 'Môi trường ổn định'],
  },
  QuantFlow: {
    name: 'QuantFlow',
    industry: 'Data Engineering / Fintech',
    size: '100 - 250 nhân viên',
    location: 'Hà Nội',
    founded: '2020',
    website: 'quantflow.ai',
    description:
      'QuantFlow xây dựng hạ tầng dữ liệu real-time cho các công ty tài chính và ngân hàng. Stack kỹ thuật hiện đại gồm Kafka, Spark, Airflow phục vụ hàng triệu sự kiện/giây.',
    perks: ['Lương cạnh tranh 14-20 triệu', 'Hệ thống dữ liệu quy mô lớn', 'Lộ trình lên Middle'],
  },
  EduPlus: {
    name: 'EduPlus',
    industry: 'EdTech',
    size: '50 - 120 nhân viên',
    location: 'Đà Nẵng',
    founded: '2021',
    website: 'eduplus.vn',
    description:
      'EduPlus phát triển ứng dụng học tập cá nhân hóa cho học sinh và sinh viên Việt Nam. Sản phẩm kết hợp nội dung chất lượng cao với AI để tối ưu trải nghiệm học và tăng tỷ lệ hoàn thành khóa học.',
    perks: ['Remote linh hoạt', 'Training growth & product writing', 'Startup giáo dục năng động'],
  },
};

export function getCompanyInfo(companyName: string): CompanyInfo | undefined {
  return companyDirectory[companyName];
}

export function getJobById(jobId: string): JobPost | undefined {
  return mockJobs.find(job => job.id === jobId);
}

export function formatSalaryVnd(min: number, max: number): string {
  return `${Math.round(min / 1000000)} - ${Math.round(max / 1000000)} triệu VND`;
}

export function formatPostedDate(dateIso: string): string {
  const now = new Date();
  const target = new Date(dateIso);
  const diffMs = now.getTime() - target.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) return 'Đăng hôm nay';
  if (diffDays === 1) return 'Đăng 1 ngày trước';
  return `Đăng ${diffDays} ngày trước`;
}
