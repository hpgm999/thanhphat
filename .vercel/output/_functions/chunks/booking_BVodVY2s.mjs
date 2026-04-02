const prerender = false;
async function POST({ request }) {
  try {
    const data = await request.json();
    console.log(data);
    const botToken = undefined                                   || process.env?.TELEGRAM_BOT_TOKEN;
    const chatId = undefined                                 || process.env?.TELEGRAM_CHAT_ID;
    if (botToken && chatId) {
      const message = `🛎 <b>YÊU CẦU ĐẶT PHÒNG MỚI</b> 🛎

👤 Khách hàng: <b>${data.name}</b>
📱 Số ĐT: <code>${data.phone}</code>
📅 Nhận phòng: <b>${data.checkInDate}</b>
📅 Trả phòng: <b>${data.checkOutDate}</b>
🏡 Loại phòng: <b>${data.roomType}</b>
📝 Ghi chú: <i>${data.requests || "Không có"}</i>`;
      const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML"
        })
      });
      if (!telegramResponse.ok) {
        console.error("Telegram Error:", await telegramResponse.text());
      }
    } else {
      console.warn("Chưa cấu hình TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID, bỏ qua việc gửi tin nhắn.");
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Yêu cầu đặt phòng của bạn đã được ghi nhận. Lễ tân sẽ liên hệ trong 5 phút."
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Booking API Error:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Dữ liệu không hợp lệ."
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
