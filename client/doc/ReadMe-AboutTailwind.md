# Tailwind CSS

- ‼️ Hiện tại `Tailwind CSS` **(v4)** (phát hành **2025**) đã thay đổi <u>cách cấu hình</u> và <u>cách viết `utility`</u> khá nhiều so với **(v3)**.
- 🔗 [Dark mode](https://tailwindcss.com/docs/dark-mode)

## Tailwind (v3) ➡️ (v4)

- 🔑 Khác biệt giữa `Tailwind v3 và v4`:
  - 1️⃣ Không còn `tailwind.config.js`:
    - **Tailwind** `v4` là _"zero-config"_, mọi thứ cấu hình nằm trong file _"theme.css"_ `(CSS entrypoint)`.
  - 2️⃣ Không còn `@tailwind base/components/utilities`:
    - Thay bằng `@import "tailwindcss"` trực tiếp trong file `(.css)`.
  - 3️⃣ _Plugin, extend theme, custom colors, spacing, fonts..._
    - Dùng `CSS Layering API` mới của **Tailwind**.
  - 4️⃣ `Utility classes` vẫn giữ nguyên **90%**, nhưng một số đổi cú pháp:
    - 🔗 [Changes from v3](https://tailwindcss.com/docs/upgrade-guide#changes-from-v3)

- 📌 Ví dụ chuyển đổi `V3 → V4`:
  - 1️⃣ Cấu hình cơ bản:
    - V3 (cũ):

    ```js
    // tailwind.config.js
    module.exports = {
      content: ["./src/**/*.{js,ts,jsx,tsx}"],
      theme: {
        extend: {
          colors: {
            brand: "#1DA1F2",
          },
        },
      },
      plugins: [],
    };
    ```

    - V4 (mới):

    ```css
    /* theme.css */
    @import "tailwindcss";

    @theme {
      --color-brand: #1da1f2;
    }
    ```

  - 2️⃣ Import trong `globals.css`:
    - V3 (cũ):

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

    - V4 (mới):

    ```css
    @import "tailwindcss";
    ```

  - 3️⃣ Dùng màu custom:
    - V3 (cũ):

    ```tsx
    <div className="bg-brand p-4 text-white">Hello</div>
    ```

    - V4 (mới):

    ```tsx
    // 👉 Vẫn giữ nguyên, vì đã định nghĩa trong @theme
    <div className="bg-brand p-4 text-white">Hello</div>
    ```

  - 4️⃣ Background Image:
    - V3 (cũ):

    ```tsx
    <div className="h-64 w-full bg-[url('/img/hero.png')]"></div>
    ```

    - V4 (mới):

    ```tsx
    <div className="h-64 w-full bg-[url:/img/hero.png]"></div>
    ```

  - 5️⃣ Animation Custom:
    - V3 (cũ):

    ```css
    @keyframes wiggle {
      0%,
      100% {
        transform: rotate(-3deg);
      }
      50% {
        transform: rotate(3deg);
      }
    }
    ```

    ```tsx
    <div className="animate-[wiggle_1s_ease-in-out_infinite]"></div>
    ```

    - V4 (mới):

    ```css
    @keyframes wiggle {
      0%,
      100% {
        transform: rotate(-3deg);
      }
      50% {
        transform: rotate(3deg);
      }
    }
    ```

    ```tsx
    <div className="animate-wiggle/1s/ease-in-out/infinite"></div>
    ```

## ⚙️ Config Prettier

- 🔗 [Automatic Class Sorting with Prettier](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)
- 🔗 [tailwindlabs / prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
  - Sau khi cài đặt các package cần thiết.
  - Bạn cần thêm `plugin` _"prettier-plugin-tailwindcss"_ vào file cấu hình của **Prettier**.
  - File `.prettierrc`:
    ```
    {
      "plugins": ["prettier-plugin-tailwindcss"]
    }
    ```
  - Khi sử dụng `Tailwind CSS v4`, bạn phải chỉ định điểm nhập tệp `CSS`, bao gồm: _"your theme, custom utilities, and other Tailwind configuration options"_.
  - Để thực hiện việc này, hãy sử dụng tùy chọn `tailwindStylesheet` trong cấu hình **Prettier**.
  - File `.prettierrc`:
    ```
    {
      "tailwindStylesheet": "src/app/globals.css"
    }
    ```
