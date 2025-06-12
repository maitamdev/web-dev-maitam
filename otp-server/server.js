const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

let currentOTP = null;

app.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    currentOTP = Math.floor(100000 + Math.random() * 900000).toString();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sửa này thành gmail của bạn",          // Thay thế bằng email của bạn// 
            pass: "tạo mật khẩu ứng dụng trong Gmail"    // Thay thế bằng mật khẩu ứng dụng của bạn//     
        }
    });

    await transporter.sendMail({
        from: '"My Web App" <YOUR_GMAIL@gmail.com>',
        to: email,
        subject: "Mã OTP đăng nhập",
        text: `Mã OTP của bạn là: ${currentOTP}`
    });

    res.json({ message: "OTP đã gửi qua email!" });
});

app.post("/verify-otp", (req, res) => {
    const { otp } = req.body;
    res.json({ success: otp === currentOTP });
});

app.listen(3000, () => {
    console.log("✅ Server đang chạy tại http://localhost:3000");
});
