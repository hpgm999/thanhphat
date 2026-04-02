export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();
    console.log("=== THÔNG TIN BOOKING NHẬN ĐƯỢC ===");
    console.log(data);
    
    // Todo (API-02): Gắn logic gọi Telegram/Zalo/Email ở đây
    
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
