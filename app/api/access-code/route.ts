import { NextRequest, NextResponse } from "next/server";
import md5 from "spark-md5";
import { getServerSideConfig } from "../../config/server";

async function handle(req: NextRequest) {
  const serverConfig = getServerSideConfig();

  if (!serverConfig.needCode) {
    return NextResponse.json({ ok: true });
  }

  const body = await req.json().catch(() => ({}));
  const accessCode = String(body?.accessCode ?? "").trim();
  const hashedCode = md5.hash(accessCode);

  return NextResponse.json({
    ok: serverConfig.codes.has(hashedCode),
  });
}

export const POST = handle;
export const runtime = "edge";
