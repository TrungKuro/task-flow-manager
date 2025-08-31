/* eslint-disable @typescript-eslint/no-explicit-any */

// File này dùng để seed (tạo dữ liệu mẫu) cho database thông qua Prisma ORM
// Script này sẽ xóa toàn bộ dữ liệu cũ và import dữ liệu mới từ các file JSON
// Thường được chạy trong quá trình development hoặc setup database ban đầu

import { PrismaClient } from "@prisma/client"; //! Phù hợp bản cũ khi Generate Prisma Client tạo code trong thư mục `./node_modules/@prisma/client`
import fs from "fs";
import path from "path";

// Khởi tạo Prisma client để kết nối và thao tác với database
const prisma = new PrismaClient();

/**
 * Hàm xóa toàn bộ dữ liệu từ các bảng trong database
 * @param orderedFileNames - Mảng tên file tương ứng với tên các model/bảng
 *
 * Lưu ý: Thứ tự xóa rất quan trọng để tránh lỗi foreign key constraint
 * Phải xóa các bảng con (có foreign key) trước, sau đó mới xóa bảng cha
 */
async function deleteAllData(orderedFileNames: string[]) {
  // Chuyển đổi tên file thành tên model (viết hoa chữ cái đầu)
  // Ví dụ: "user.json" -> "User", "projectTeam.json" -> "ProjectTeam"
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  // Lặp qua từng model và xóa toàn bộ dữ liệu
  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    try {
      // Xóa tất cả records trong bảng
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error) {
      console.error(`Error clearing data from ${modelName}:`, error);
    }
  }
}

/**
 * Hàm chính thực hiện quá trình seed database
 * 1. Xóa toàn bộ dữ liệu cũ
 * 2. Import dữ liệu mới từ các file JSON trong thư mục seedData
 */
async function main() {
  // Đường dẫn tới thư mục chứa các file JSON với dữ liệu seed
  const dataDirectory = path.join(__dirname, "seedData");

  // Danh sách các file JSON theo thứ tự import
  // Thứ tự này rất quan trọng để đảm bảo:
  // - Các bảng cha (team, project, user) được tạo trước
  // - Các bảng con có foreign key (task, comment, taskAssignment) được tạo sau
  const orderedFileNames = [
    "team.json", // Bảng team (bảng cha)
    "project.json", // Bảng project (bảng cha)
    "projectTeam.json", // Bảng quan hệ project-team
    "user.json", // Bảng user (bảng cha)
    "task.json", // Bảng task (có FK tới project, user)
    "attachment.json", // Bảng attachment (có FK tới task)
    "comment.json", // Bảng comment (có FK tới task, user)
    "taskAssignment.json", // Bảng quan hệ task-user
  ];

  // Bước 1: Xóa toàn bộ dữ liệu cũ trong database
  await deleteAllData(orderedFileNames);

  // Bước 2: Import dữ liệu mới từ các file JSON
  for (const fileName of orderedFileNames) {
    // Đọc file JSON và parse thành object
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Lấy tên model từ tên file (user.json -> user -> User)
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    try {
      // Tạo từng record trong database từ dữ liệu JSON
      for (const data of jsonData) {
        await model.create({ data });
      }
      console.log(`Seeded ${modelName} with data from ${fileName}`);
    } catch (error) {
      console.error(`Error seeding data for ${modelName}:`, error);
    }
  }
}

// Chạy script seed
// - Nếu có lỗi sẽ log error ra console
// - Luôn đảm bảo disconnect khỏi database sau khi hoàn thành
main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
