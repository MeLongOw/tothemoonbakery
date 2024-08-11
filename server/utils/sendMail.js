const nodemailer = require("nodemailer");
const { formatMoney } = require("./helper");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.TTM_GOOGLE_MAIL_USERNAME,
        pass: process.env.TTM_GOOGLE_MAIL_PASSWORD,
    },
});

// async..await is not allowed in global scope, must use a wrapper
const sendPendingOrderMail = async ({ to, cart, orderId }) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"To the Moon bakery" <no_reply@tothemoon.bakery.vn>', // sender address
        to, // list of receivers
        subject: "Đơn hàng đặt bánh", // Subject line
        html: ` <div style="border-width: 2px; border-color: rgb(229, 231, 235); border-style: solid; border-radius: 8px; padding: 16px">
        <h3 style="font-size: 24px; font-weight: 700; text-align: center; text-transform: uppercase">
            Chi tiết đơn hàng
        </h3>
        <div style="font-weight: 600; width: 100%">
            <div style="display: flex">
                <div style="padding: 16px; border: 1px solid black">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt"
                        style="object-fit: cover; width: 120px; height: 120px; border-radius: 8px"
                    />
                </div>
                <div style="display: flex; border: 1px solid black;">
                    <div style="padding: 16px;">
                        <div style="font-size: 18px">Huynh Long 2</div>
                        <div style="font-style: italic; display: flex; gap: 8px">
                            <div style="font-style: italic; display: flex">
                                <div style="font-style: italic">Size S</div>
                            </div>
                            <div style="font-style: italic; display: flex; gap: 8px">
                                <div style="font-style: italic">/</div>
                                <div style="font-style: italic">
                                    Hạnh Nhân
                                </div>
                            </div>
                        </div>
                        <div style="color: rgb(74, 222, 128)">
                            Đơn giá: 300.000 VND
                        </div>
                    </div>
                    <div style="padding: 16px;">
                        <div style="color: rgb(74, 222, 128); font-weight: 700">
                            300.000 VND
                        </div>
                        Số lượng: 1
                    </div>
                </div>
            </div>
            <div style="color: rgb(74, 222, 128); border: 2px; font-size: 20px; font-weight: 700; padding-top: 16px; text-align: end; border-color: rgb(229, 231, 235); border-style: solid">
                Tổng tiền:
                <span style="font-style: italic">300.000 VND</span>
            </div>
            <div style="align-items: center">
                <p style="font-style: italic">
                    Xin chân thành cảm ơn quý khách đã tin tưởng và ủng hộ
                    To the Moon Bakery 
                    <span style="color: rgb(220, 38, 38); font-style: italic">
                        ♥️ ♥️ ♥️
                    </span>
                    . Quý khách vui lòng thực hiện thanh toán trước cho đơn
                    hàng. Kính chúc quý khách ngon miệng khi hưởng thức
                    những sản phẩm của To The Moon 🎂 🎂
                </p>
                <div style="font-size: 20px; font-weight: 700; text-align: center; text-transform: uppercase; padding-bottom: 16px;">
                    QR Thanh toán
                </div>
               <div style="width: 100%; position: relative;">
                    <div style="position: absolute; left: 50%; transform: translateY(-50%);">
                        <img
                            src="https://img.vietqr.io/image/546034-0906243664-compact.png?amount=300000"
                            style="width: 200px; height: 200px; border-width: 2px; border-color: rgb(229, 231, 235); border-style: solid; border-radius: 8px; padding: 16px"
                        />
                    </div>
               </div>
            </div>
        </div>
    </div>`, // html body
    });
};

module.exports = {
    sendPendingOrderMail,
};
