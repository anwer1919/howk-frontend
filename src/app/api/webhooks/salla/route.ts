// ============================================================
// نقطة استقبال أحداث سلة (Webhooks)
// الهدف الأساسي: استقبال حدث app.store.authorize لحظة تثبيت
// التطبيق على المتجر، والذي يحمل access_token داخل جسم الطلب
// ============================================================

export const dynamic = "force-dynamic";

interface SallaAuthorizePayload {
  event?: string;
  merchant?: number;
  created_at?: string;
  data?: {
    access_token?: string;
    expires?: number;
    refresh_token?: string;
    scope?: string;
    token_type?: string;
  };
}

export async function POST(request: Request) {
  let payload: SallaAuthorizePayload;

  try {
    payload = await request.json();
  } catch {
    console.error("[salla-webhook] invalid JSON body");
    return Response.json({ received: true }, { status: 200 });
  }

  // نطبع الحدث في اللوج دائمًا عشان نتابع أي شيء يوصل
  console.log(`[salla-webhook] event received: ${payload.event}`);

  if (payload.event === "app.store.authorize" && payload.data?.access_token) {
    // مهم: هذا يظهر التوكن في Vercel Logs — انسخه من هناك فورًا وضعه في
    // SALLA_API_TOKEN، ثم يفضّل حذف هذا الملف لاحقًا لأسباب أمنية
    console.log("[salla-webhook] ============================================");
    console.log("[salla-webhook] ACCESS TOKEN (انسخه الآن):");
    console.log(payload.data.access_token);
    console.log("[salla-webhook] merchant:", payload.merchant);
    console.log("[salla-webhook] scope:", payload.data.scope);
    console.log("[salla-webhook] expires:", payload.data.expires);
    console.log("[salla-webhook] ============================================");
  }

  // لازم نرجع 200 دايمًا وبسرعة، وإلا سلة هتعتبر الـ webhook فاشل
  return Response.json({ received: true }, { status: 200 });
}

// بعض الأدوات بتعمل GET تجريبي للتأكد إن الرابط شغال
export async function GET() {
  return Response.json({ status: "ok", message: "Salla webhook endpoint is live" });
}
