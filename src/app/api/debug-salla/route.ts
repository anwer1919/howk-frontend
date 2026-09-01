// ============================================================
// نقطة تشخيص مؤقتة — لفحص الاتصال بسلة مباشرة من المتصفح
// احذف هذا الملف بعد ما تخلص التشخيص (فيه معلومات تقنية حساسة نسبيًا)
// ============================================================

export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.SALLA_API_TOKEN;

  if (!token) {
    return Response.json({
      step: "token_check",
      result: "FAIL",
      message: "SALLA_API_TOKEN غير موجود في بيئة التشغيل الحالية (Production)",
    });
  }

  try {
    const res = await fetch("https://api.salla.dev/admin/v2/products?per_page=10&page=1", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const bodyText = await res.text();
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(bodyText);
    } catch {
      // مش JSON صالح
    }

    if (!res.ok) {
      return Response.json({
        step: "fetch_products",
        result: "FAIL",
        http_status: res.status,
        http_status_text: res.statusText,
        raw_body_snippet: bodyText.slice(0, 500),
      });
    }

    const data = (parsed as { data?: Array<Record<string, unknown>>; pagination?: unknown })?.data ?? [];

    return Response.json({
      step: "fetch_products",
      result: "SUCCESS",
      http_status: res.status,
      total_products_this_page: data.length,
      pagination: (parsed as { pagination?: unknown })?.pagination,
      sample_products: data.slice(0, 5).map((p) => ({
        sku: p.sku,
        name: p.name,
        price: p.price,
        sale_price: p.sale_price,
        quantity: p.quantity,
        main_image: p.main_image,
      })),
    });
  } catch (err) {
    return Response.json({
      step: "fetch_products",
      result: "EXCEPTION",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
