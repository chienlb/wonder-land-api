import { MailService } from "src/app/configs/mail/mail.service";
import { promises as fs } from "fs";
import * as path from "path";

/**
 * Gửi email xác minh kèm mã xác minh và thời gian hết hạn
 * Sử dụng template mail.html trong thư mục templates
 */
export async function sendEmail(
    to: string,
    subject: string,
    code: string,
    expiresIn: number = 900, // 15 phút
) {
    try {
        const mailService = new MailService();

        // Format thời gian hết hạn
        const minutes = Math.floor(expiresIn / 60);
        const seconds = expiresIn % 60;
        const formattedExpire = `${minutes} phút${seconds > 0 ? ` ${seconds} giây` : ""}`;
        const timerFormat = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        // Đường dẫn tuyệt đối đến file template
        const templatePath = path.resolve(__dirname, "../../templates/app/templates/mail.html");

        // Đọc nội dung template
        let template = await fs.readFile(templatePath, "utf-8");

        // Replace các phần placeholder trong HTML
        template = template
            // Chèn mã xác minh vào phần code-display
            .replace(
                /<div class="code-display"[^>]*>.*?<\/div>/s,
                `<div class="code-display" id="codeDisplay">${code}</div>`
            )
            // Chèn thời gian đếm ngược
            .replace(
                /<div class="timer"[^>]*>.*?<\/div>/s,
                `<div class="timer" id="countdown">${timerFormat}</div>`
            )
            // Thay đổi dòng JS thời gian đếm ngược (nếu có script)
            .replace(
                /let totalSeconds = \d+ \* 60; \/\/ \d+ minutes/,
                `let totalSeconds = ${expiresIn}; // ${minutes} minutes`
            );

        // Gửi email
        await mailService.sendMail(to, subject, template);
    } catch (error: any) {
        console.error("[SendEmail] Error:", error);
        throw new Error(error?.message || "Error when sending mail.");
    }
}
